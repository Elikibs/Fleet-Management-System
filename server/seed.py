from faker import Faker
from app import app
from models import Member, Route, Matatu, db
import random

with app.app_context():
    fake = Faker()
    
    Member.query.delete()
    Route.query.delete()
    Matatu.query.delete()

    routes = {
        'NRB-Kikuyu': 70,
        'NRB-Juja': 80,
        'NRB-Thika': 100,
        'NRB-Kitengela': 70,
        'NRB-Nong': 60,
        'NRB-Makongeni': 110,
        'NRB-Kahawa': 60,
        'NRB-Rongai': 100,
        'NRB-Kisumu': 1200,
        'NRB-Kakamega': 1100,
    }
    all_routes = []

    for route_name, route_price in routes.items():
        route = Route(
            name = route_name,
            price = route_price,
        )
        all_routes.append(route)

        db.session.add(route)
        db.session.commit()
    
    members = []
    for i in range(60):
        member = Member(
            name = fake.name(),
            phone = int(fake.numerify(text='+2547########')),
            national_id = int(fake.numerify(text=f'{random.randint(1, 4)}#######')),
            location = random.choice(['Nairobi', 'Thika', 'Mombasa', 'Kisumu', 'Nakuru', 'Juja', 'Machakos']),
        )
        members.append(member)
        
        db.session.add(member)
        db.session.commit()

    matatus = []
    for route in all_routes:
        for _ in range(random.randint(20, 40)):
            member = random.choice(members)
            route = random.choice(all_routes)

            sec = random.choice(['B', 'C', 'D'])
            letter = fake.random_letter().title()
            plates = fake.numerify(text=f'K{sec}{letter} ###{letter}')

            matatu = Matatu(
                driver_name = fake.name(),
                driver_contact = int(fake.numerify(text='+2547#########')),
                number_plate = plates,
                capacity = random.choice([40, 50]),
                avg_rounds_pd = random.choice([9, 10, 11, 12, 13, 14, 15, 16]),
                member_id = member.id,
                route_id = route.id,
            )
            matatus.append(matatu)

    db.session.add_all(matatus)
    db.session.commit()
    db.session.close()