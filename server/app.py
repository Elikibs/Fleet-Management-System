from flask import Flask, Blueprint, jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt, current_user, get_jwt_identity
from models import db, User, TokenBlocklist
from schemas import UserSchema

app = Flask(__name__)
app.secret_key = 'b33b151adaccb5d08c9eb0c0'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fleets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize apps
migrate = Migrate(app, db)
jwt = JWTManager(app)
db.init_app(app)

# Initializing blueprints 
auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('users', __name__)

# Creating blueprints
@auth_bp.post('/register')
def register_user():
    data = request.get_json()

    user = User.get_user_by_username(username=data.get('username'))

    if user is not None:
        return jsonify(
            {"Error": "User already exists"}
        ), 403 
    new_user = User(
        username = data.get('username'),
        email = data.get('email'),
    )
    new_user.set_password(password=data.get('password'))
    new_user.save_user()

    return jsonify(
        {"Message": "User created"}
    ), 201

@auth_bp.post('/login')
def login_user():
    data = request.get_json()

    user = User.get_user_by_username(username=data.get('username'))
    
    if user and (user.check_password(password= data.get('password'))):
        access_token = create_access_token(identity = user.username)
        refresh_token = create_refresh_token(identity =user.username)
        return jsonify(
            {
                "Message": "Logged in", 
                "tokens" : {
                    "access": access_token,
                    "refresh": refresh_token,
                }
            }
        ), 200
    
    return jsonify(
        {"Error": "Invalid username or password"}
    ), 400


@auth_bp.get('/whoami')
@jwt_required()
def whoami():
    return jsonify(
        {
            "user_details": {
                "username": current_user.username,
                "email": current_user.email
            }
        }
        
    )

@auth_bp.get('/refresh')
@jwt_required(refresh=True)
def refresh_access():
    identity  = get_jwt_identity()
    new_access_token = create_access_token(identity = identity)
    return jsonify(
        {"acess_token":new_access_token}
    )

@auth_bp.get('/logout')
@jwt_required(verify_type=False)
def logout_user():
    jwt = get_jwt()
    jti = jwt['jti']
    token_type = jwt['type']

    token_b = TokenBlocklist(jti=jti)
    token_b.save_token()

    return jsonify(
        {"message": f"{token_type} token revoked successfully"}
    ), 200




@user_bp.get('/all')
@jwt_required()
def get_all_users():
    claims = get_jwt()
    if claims.get("is_admin") == True:
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=1, type=int)

        users = User.query.paginate(
            page = page,
            per_page = per_page
        )
        response = UserSchema().dump(users, many=True)
        return jsonify(response), 200
    
    return jsonify(
        {
            "message": "You are not authorized to access this"
        }
    ),401


# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/users')

# load user
@jwt.user_lookup_loader
def user_lookup_callback(jwt_header, jwt_data):
    identity = jwt_data['sub']
    return User.query.filter_by(username=identity).one_or_none()


# additional claims
@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "John Doe":
        return {"is_admin": True}
    return {"is_admin": False}

# jwt error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify(
        {
            "message": "Token hasexpired",
            "error" : "token_expired"
        }
    ), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify(
        {
            "message": "Signature verification failed",
            "error": "invalid_token"
        }
    ), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify(
        {
            "message": "Request does not contain a valid token",
            "error": "authorization required"
        }
    ), 401

@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']

    token = db.session.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).scalar()
    
    return token is not None




if __name__ == '__main__':
    app.run(port=5555, debug=True)

