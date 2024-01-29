from marshmallow import fields, Schema

class UserSchema(Schema):
    id = fields.Integer()
    username = fields.String()
    email = fields.String()

class RouteSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    price = fields.Integer()

class MatatuSchema(Schema):
    id = fields.Integer()
    driver_name = fields.String()
    driver_contact = fields.Integer()
    number_plate = fields.String()
    capacity = fields.String()
    avg_rounds_pd = fields.String()

    user_id = fields.Integer()
    route_id = fields.Integer()