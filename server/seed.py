from faker import Faker
from app import app
from models import Member, Route, Matatu, db
import random

with app.app_context():
  fake = Faker()
  
  Member.query.delete()
  Route.query.delete()
  Matatu.query.delete()