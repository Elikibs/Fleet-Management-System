from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.Text)

    def __repr__(self):
        return f"<User {self.username}>"
    
    # set hash password
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    # check if password is correct >> login
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    # check if user exists
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    
    # saving user
    def save_user(self):
        db.session.add(self)
        db.session.commit()
    
    # deleting user
    def delete_user(self):
        db.session.delete(self)
        db.session.commit()

class TokenBlocklist(db.Model):
    __tablename__='tokenblocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Token {self.jti}>"
    
    def save_token(self):
        db.session.add(self)
        db.session.commit()

class Route(db.Model):
    __tablename__='routes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)

    def __repr__(self):
        return f"<Route {self.name} is KES {self.price}>"

class Matatu(db.Model):
    __tablename__="matatus"

    id = db.Column(db.Integer, primary_key=True)
    driver_name = db.Column(db.String)
    driver_contact = db.Column(db.Integer)
    number_plate = db.Column(db.String)
    capacity = db.Column(db.String)
    avg_rounds_pd = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)

    def __repr__(self):
        return f"<Matatu: {self.number_plate}, capacity:{self.capacity}, trips:{self.avg_rounds_pd}>"

    

