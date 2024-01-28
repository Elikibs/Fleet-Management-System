from faker import Faker
from werkzeug.security import generate_password_hash, check_password_hash
import random
from app import app
from models import db, User, Route, Matatu


with app.app_context():
    User.query.delete()
    Route.query.delete()
    Matatu.query.delete()


    fake = Faker()

    users_data = [
        {"id": 1, "username": "John Doe", "email": "cbraghini0@elpais.com", "password": generate_password_hash("john123")}, 
        {"id": 2, "username": "Stephanie Mechan", "email": "smechan1@cocolog-nifty.com", "password": generate_password_hash("steph123")}, 
        {"id": 3, "username": "Stanleigh Amsberger", "email": "samsberger2@deviantart.com", "password": generate_password_hash("stanleigh123")}, 
        {"id": 4, "username": "Benito Moors", "email": "bmoors3@npr.org", "password": generate_password_hash("benito123")}, 
        {"id": 5, "username": "Hedi Sainte Paul", "email": "hsainte4@phoca.cz", "password": generate_password_hash("hedi123")}, 
        {"id": 6, "username": "Austen Oxer", "email": "aoxer5@tripod.com", "password": generate_password_hash("austen123")}, 
        {"id": 7, "username": "Donovan Klouz", "email": "dklouz6@booking.com", "password": generate_password_hash("donovan123")}, 
        {"id": 8, "username": "Egan Girt", "email": "egirt7@bloomberg.com", "password": generate_password_hash("egan123")}, 
        {"id": 9, "username": "Monique Waith", "email": "mwaith8@hexun.com", "password": generate_password_hash("monique123")}, 
        {"id": 10, "username": "Sherry Stanbury", "email": "sstanbury9@shareasale.com", "password": generate_password_hash("sherry123")}, 
        {"id": 11,"username": "Desmund Bampkin", "email": "dbampkina@opera.com","password": generate_password_hash("desmund123")},      
        {"id": 12, "username": "Delcina Keyte", "email": "dkeyteb@skype.com", "password": generate_password_hash("delcina123")}, 
        {"id": 13, "username": "Delaney Kave", "email": "dkavec@a8.net", "password": generate_password_hash("delaney123")}, 
        {"id": 14, "username": "Broderick Denty", "email": "bdentyd@sourceforge.net", "password": generate_password_hash("broderick123")}, 
        {"id": 15, "username": "Cahra Siveyer", "email": "csiveyere@multiply.com", "password": generate_password_hash("cahra123")}, 
        {"id": 16, "username": "Emlyn Slisby", "email": "eslisbyf@techcrunch.com", "password": generate_password_hash("emlyn123")}, 
        {"id": 17, "username": "Leicester Dart", "email": "ldartg@vimeo.com", "password": generate_password_hash("leicester123")},
        {"id": 18, "username": "Aliza O'Canavan", "email": "aocanavanh@google.com.hk", "password": generate_password_hash("aliza123")}, 
        {"id": 19, "username": "Caesar Paice", "email": "cpaicei@yolasite.com", "password": generate_password_hash("caesar123")}, 
        {"id": 20, "username": "Isobel Millington", "email": "imillingtonj@t.co", "password": generate_password_hash("isobel123")}
    ]

    routes_data = [
        {"id": 1, "name": "NRB-Juja", "price": 80}, 
        {"id": 2, "name": "NRB-Rongai", "price": 100}, 
        {"id": 3, "name": "NRB-Westands", "price": 50}, 
        {"id": 4, "name": "NRB-Kikuyu", "price": 70}, 
        {"id": 5, "name": "NRB-Mlolongo", "price": 100}, 
        {"id": 6, "name": "NRB-Ruaka", "price": 100}, 
        {"id": 7, "name": "NRB-Donholm", "price": 80}, 
        {"id": 8, "name": "NRB-Thika", "price": 100}, 
        {"id": 9, "name": "NRB-Fedha", "price": 80}, 
        {"id": 10, "name": "NRB-Limuru", "price": 100}
    ]

    print("Seeding users data")

    for user in users_data:
        data = User(**user)
        db.session.add(data)
    db.session.commit()

    print("Seeding routes data")

    for route in routes_data:
        data = Route(**route)
        db.session.add(data)
    db.session.commit()

    # Query users and routes ofr use in seeding matatus
    users = User.query.all()
    routes = Route.query.all()


    print("Seeding matatu data")
    matatus = []
    for route in routes:
        for i in range(random.randint(1, 10)):  # Generate between 1 and 10 matatus per route
            user = random.choice(users) # Choose a random member in the list
            route = random.choice(routes)  # Choose a random route in the list

            # Generate random, realistic Kenyan number plates
            sec = random.choice(['B', 'C', 'D'])    
            letter = fake.random_letter().title()
            plates= fake.numerify(text=f'K{sec}{letter} ###{letter}') 
            
            matatu = Matatu(
                driver_name = fake.name(),
                driver_contact = int(fake.numerify(text='+2547#########')),
                number_plate=plates,
                capacity=random.choice([14, 30, 50]),
                avg_rounds_pd=random.choice([9, 10, 11, 12, 13, 14, 15, 16]),
                user_id=user.id,  # Set the user_id for the matatu
                route_id=route.id,  # Set the route_id for the matatu
            )
            matatus.append(matatu)

    db.session.add_all(matatus)
    db.session.commit()
    print('Tables seeded successfully!')