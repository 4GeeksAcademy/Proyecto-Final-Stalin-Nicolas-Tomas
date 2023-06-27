"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.admin import setup_admin
from api.models import db, Book
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)
api.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    api.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    api.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(api, db)
db.init_api(api)
CORS(api)
setup_admin(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/books', methods=['GET'])
def books():

    libros = Book.query.all()

    data = []
    for books in libros:
        data.append(books.serialize())
       

    return jsonify(data), 200    

@api.route('/books', methods=['POST'])
def bookPost():
    
    body = request.get_json()
    libros = Book (
         name=body['name'],
         price=body['price']
         description=body['description']

    )
    db.session.add(libros)
    db.session.commit()
    response_body = {
    "msg": "Book added correctly"
    }
    return jsonify(response_body),200
@api.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):

    delete_book = Book.query.get(book_id)
   
    if not delete_book:
        return jsonify("No existe"),
    
    db.session.delete(delete_book)
    db.session.commit()

    return jsonify("The book has been deleted successfully"), 200

