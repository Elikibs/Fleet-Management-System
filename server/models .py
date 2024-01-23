from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Member(db.model):
    __tablename__ = 'members'

    id = db.Columnn(db.Integer, primary_key=True)
    name = db.Columnn(db.String)
    national_id = db.Columnn(db.Integer)
    location = db.Colum(db.String)
    phone = db.Columnn(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def __repr__(self):

        return f'Member(id = {self.id}, ' + \
            f'name = {self.name}, ' + \
            f'national_id = {self.national_id}, ' + \
            f'location = {self.location}, ' + \
            f'contact = +{self.phone})'



