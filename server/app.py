from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource, Api
from flask_migrate import Migrate
from models import db, Member, Route, Matatu

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fleets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

class Index(Resource):
    def get(self):
        response_dict = {
            "index": "Fleets RESTful API"
        }
        response = make_response(
            jsonify(response_dict), 
            200,
        )
        return response
api.add_resource(Index, '/')

# Login endpoint
class Login(Resource):
    def post(self):
        member = Member.query.filter(Member.name == request.get_json()['name']).first()
        
        if member:
            session['user_id'] = member.id
            return make_response(jsonify(member.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)


# Logout endpoint
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response(jsonify({'message': '204: No Content'}), 204)

# Checking session endpoint
class CheckSession(Resource):
    def get(self):
        
        user = Member.query.filter(Member.id == session.get('user_id')).first()
        
        if user:
            return make_response(jsonify(user.to_dict()),200)
        else:
            return make_response(jsonify({}), 401)


class Members(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Member.query.all()]
        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response
    
    def post(self):
        new_member = Member(
            name=request.form['name'],
            national_id=request.form['national_id'],
            location=request.form['location'],
            phone=request.form['phone'],
        )
        db.session.add(new_member)
        db.session.commit()

        response_dict = new_member.to_dict()
        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response
    
api.add_resource(Members, '/members')

# Retrieving single records
class MemberByID(Resource):
    def get(self, id):
        response_dict = Member.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
    
    def patch(self, id):
        pass
    
    def delete(self, id):
        pass
api.add_resource(MemberByID, '/members/<int:id>')

class Routes(Resource):
    member = Member.query.filter(Member.id == session.get('user_id')).first()
    
    if member:
        def get(self):

            response_dict_list = [n.to_dict() for n in Route.query.all()]
            response = make_response(
                jsonify(response_dict_list), 
                200,
            )
            return response
    def post(self):
        new_route = Route(
            name=request.form['name'],
            price=request.form['price'],
        )
        db.session.add(new_route)
        db.session.commit()

        response_dict = new_route.to_dict()
        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response

api.add_resource(Routes, '/routes')

class RouteByID(Resource):
    def get(self, id):
        response_dict = Route.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
    
    def patch(self, id):
        pass
    
    def delete(self, id):
        pass
api.add_resource(MemberByID, '/routes/<int:id>')

class Matatus(Resource):
    def get(self):
        response_dict_list = [n.to_dict()  for n in Matatu.query.all()]
        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response
    def post(self):
        new_matatu = Matatu(
            driver_name=request.form['driver_name'],
            driver_contact=request.form['driver_contact'],
            number_plate=request.form['number_plate'],
            capacity=request.form['capacity'],
            avg_rounds_pd=request.form['avg_rounds_pd'],
        )
        db.session.add(new_matatu)
        db.session.commit()

        response_dict = new_matatu.to_dict()
        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response
api.add_resource(Matatus, '/matatus')

class MatatuByID(Resource):
    def get(self, id):
        response_dict = Matatu.query.filter_by(id=id).first().to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response
    
    def patch(self, id):
        pass
    
    def delete(self, id):
        pass
api.add_resource(MemberByID, '/matatus/<int:id>')

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
