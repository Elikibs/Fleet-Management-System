from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Member(db.Model):
    __tablename__ = 'members'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True)
    national_id = db.Column(db.Integer)
    location = db.Column(db.String)
    phone = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    matatus = db.relationship('Matatu', back_populates='_member', cascade='all, delete-orphan')
    routes = db.association_proxy('matatus', '_route',
                                    creator=lambda rt: Matatu(route=rt))


    def __repr__(self):

        return f'Member(id = {self.id}, ' + \
            f'name = {self.name}, ' + \
            f'national_id = {self.national_id}, ' + \
            f'location = {self.location}, ' + \
            f'contact = +{self.phone})'
    
class Route(db.Model):
    __tablename__= 'routes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True)
    price = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    matatus = db.relationship('Matatu', back_populates='_route', cascade='all, delete-orphan')
    members = db.association_proxy('matatus', '_member',
                                  creator=lambda mem: Matatu(member=mem))

    def __repr__(self):
        return f'Route(id = {self.id}, ' + \
            f'name = {self.name}, ' + \
            f'price = {self.price})'

class Matatu(db.Model):
    __tablename__= 'matatus'

    id = db.Column(db.Integer, primary_key=True)
    driver_name = db.Column(db.String)
    driver_contact = db.Column(db.Integer)
    number_plate = db.Column(db.String)
    capacity = db.Column(db.Integer)
    avg_rounds_pd = db.Column(db.Integer)
    member_id = db.Column(db.Integer)
    route_id = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'))
    member_id = db.Column(db.Integer, db.ForeignKey('members.id'))

    _route = db.relationship('Route', back_populates='matatus')
    _member = db.relationship('Member', back_populates='matatus')


    def __repr__(self):
        return f'Matatu(id = {self.id}, ' + \
            f'driver_name = {self.driver_name}, ' + \
            f'driver_contact = +{self.driver_contact}, ' + \
            f'number_plate = {self.number_plate}, ' + \
            f'capacity = {self.capacity}, ' + \
            f'avg_rounds_pd = {self.avg_rounds_pd}, ' + \
            f'member_id = {self.member_id}, ' + \
            f'route_id = {self.route_id})'





