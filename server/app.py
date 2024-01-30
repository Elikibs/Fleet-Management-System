from flask import Flask, Blueprint, jsonify, request
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt, current_user, get_jwt_identity
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
from models import db, User, TokenBlocklist, Route, Matatu
from schemas import UserSchema, RouteSchema, MatatuSchema

app = Flask(__name__)
app.secret_key = 'b33b151adaccb5d08c9eb0c0'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fleets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Connecting with react
CORS(app)

# Initialize apps
migrate = Migrate(app, db)
jwt = JWTManager(app)
db.init_app(app)

# Initializing blueprints 
auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('users', __name__)
route_bp = Blueprint('routes', __name__)
matatu_bp = Blueprint('matatus', __name__)

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
        page = request.args.get('page', type=int)
        per_page = request.args.get('per_page', type=int)

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

@route_bp.get('/allroutes')
@jwt_required()
def get_all_routes():
    # Get the identity of the current user from the JWT
    identity = get_jwt_identity()

    # Query all matatus in the system
    all_matatus = Matatu.query.all()

    # Extract unique route ids from all matatus
    route_ids = set(matatu.route_id for matatu in all_matatus)

    # Query all routes based on the extracted route ids
    all_routes = Route.query.filter(Route.id.in_(route_ids)).all()

    # Serialize the routes using Marshmallow schema
    serialized_routes = RouteSchema().dump(all_routes, many=True)

    return jsonify(serialized_routes), 200

# add route for the logged-in user
@route_bp.post('/add')
@jwt_required()
def add_route():
    try:
        identity = get_jwt_identity()
        user = User.query.filter_by(username=identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        data = request.get_json()

        # Validate the data as needed

        new_route = Route(
            name=data.get('name'),
            price=data.get('price')
        )

        # Save the new Route to the database
        db.session.add(new_route)
        db.session.commit()

        # Serialize the added Route and return it in the response
        serialized_route = RouteSchema().dump(new_route)
        return jsonify({"message": "Route added successfully", "route": serialized_route}), 201

    except Exception as e:
        # Handle exceptions as needed
        return jsonify({"error": str(e)}), 500

# delete route for the logged-in user
@route_bp.delete('/delete/<int:route_id>')
@jwt_required()
def delete_route(route_id):
    try:
        identity = get_jwt_identity()
        user = User.query.filter_by(username=identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        route = Route.query.filter_by(id=route_id).first()

        if not route:
            return jsonify({"message": "Route not found"}), 404

        # Check if the route is associated with the current user
        if route not in user.routes:
            return jsonify({"message": "You are not authorized to delete this route"}), 403

        # Delete the route from the database
        db.session.delete(route)
        db.session.commit()

        return jsonify({"message": "Route deleted successfully"}), 200

    except Exception as e:
        # Handle exceptions as needed
        return jsonify({"error": str(e)}), 500

@matatu_bp.get('/allmatatus')
@jwt_required()
def get_all_matatus():
    # Get the identity of the current user from the JWT
    identity = get_jwt_identity()

    # Query all matatus in the system
    all_matatus = Matatu.query.all()

    # Serialize all matatus using Marshmallow schema
    serialized_matatus = MatatuSchema().dump(all_matatus, many=True)

    return jsonify(serialized_matatus), 200

# add matatu for the logged-in user
@matatu_bp.post('/add')
@jwt_required()
def add_matatu():
    try:
        identity = get_jwt_identity()
        user = User.query.filter_by(username=identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        data = request.get_json()

        # Validate the data as needed

        new_matatu = Matatu(
            driver_name=data.get('driver_name'),
            driver_contact=data.get('driver_contact'),
            number_plate=data.get('number_plate'),
            capacity=data.get('capacity'),
            avg_rounds_pd=data.get('avg_rounds_pd'),
            user_id=user.id,
            route_id=data.get('route_id')  # Assuming route_id is provided in the request data
        )

        # Save the new Matatu to the database
        db.session.add(new_matatu)
        db.session.commit()

        # Serialize the added Matatu and return it in the response
        serialized_matatu = MatatuSchema().dump(new_matatu)
        return jsonify({"message": "Matatu added successfully", "matatu": serialized_matatu}), 201

    except Exception as e:
        # Handle exceptions as needed
        return jsonify({"error": str(e)}), 500

# delete matatu for the logged-in user
@matatu_bp.delete('/delete/<int:matatu_id>')
@jwt_required()
def delete_matatu(matatu_id):
    try:
        identity = get_jwt_identity()
        user = User.query.filter_by(username=identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        matatu = Matatu.query.filter_by(id=matatu_id).first()

        if not matatu:
            return jsonify({"message": "Matatu not found"}), 404

        # Check if the matatu is associated with the current user
        if matatu.user_id != user.id:
            return jsonify({"message": "You are not authorized to delete this matatu"}), 403

        # Delete the matatu from the database
        db.session.delete(matatu)
        db.session.commit()

        return jsonify({"message": "Matatu deleted successfully"}), 200

    except Exception as e:
        # Handle exceptions as needed
        return jsonify({"error": str(e)}), 500

# edit matatu for the logged-in user
@matatu_bp.put('/edit/<int:matatu_id>')
@jwt_required()
def edit_matatu(matatu_id):
    try:
        identity = get_jwt_identity()
        user = User.query.filter_by(username=identity).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        matatu = Matatu.query.filter_by(id=matatu_id).first()

        if not matatu:
            return jsonify({"message": "Matatu not found"}), 404

        # Check if the matatu is associated with the current user
        if matatu.user_id != user.id:
            return jsonify({"message": "You are not authorized to edit this matatu"}), 403

        data = request.get_json()

        # Update matatu details
        matatu.driver_name = data.get('driver_name', matatu.driver_name)
        matatu.driver_contact = data.get('driver_contact', matatu.driver_contact)
        matatu.number_plate = data.get('number_plate', matatu.number_plate)
        matatu.capacity = data.get('capacity', matatu.capacity)
        matatu.avg_rounds_pd = data.get('avg_rounds_pd', matatu.avg_rounds_pd)
        matatu.route_id = data.get('route_id', matatu.route_id)

        # Save the changes to the database
        db.session.commit()

        # Serialize the updated Matatu and return it in the response
        serialized_matatu = MatatuSchema().dump(matatu)
        return jsonify({"message": "Matatu updated successfully", "matatu": serialized_matatu}), 200

    except Exception as e:
        # Handle exceptions as needed
        return jsonify({"error": str(e)}), 500


# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/users')
app.register_blueprint(route_bp, url_prefix='/routes')
app.register_blueprint(matatu_bp, url_prefix='/matatus')

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

