from flask import Flask, request, make_response, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate
from models import db, Member, Route, Matatu

app = Flask(__name__)
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)
