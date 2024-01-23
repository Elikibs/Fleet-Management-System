from flask import Flask, request, make_response, jsonify
from flask_restful import Resource, Api
from flask_migrate import Migrate
from models import db, Member, Route, Matatu

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fleets.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)