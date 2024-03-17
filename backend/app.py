from flask import request, jsonify
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# SET UP FLASK
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# DEFINE DATABASE
class Tire(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    full_desc = db.Column(db.String(120), unique=False, nullable=False)
    full_dim = db.Column(db.String(120), unique=False, nullable=False)
    rrp = db.Column(db.Integer, unique=False, nullable=False)
    moMarking = db.Column(db.String(20), unique=False)
    runflat = db.Column(db.String(20), unique=False)
    imgUrl = db.Column(db.String(120), unique=False)
    logo = db.Column(db.String(120), unique=False)
    brand = db.Column(db.String(120), unique=False)

    def to_json(self):
        return {
            "id":self.id,
            "fullDesc":self.full_desc,
            "fullDim":self.full_dim,
            "rrp":self.rrp,
            "moMarking":self.moMarking,
            "runflat":self.runflat,
            "imgUrl":self.imgUrl,
            "logo":self.logo,
            "brand":self.brand
        }
    
# SET UP ROUTES FOR API CALL
@app.route("/products", methods = ["GET"])

def get_products():
    
    products = Tire.query.all()
    print(products)
    json_products = list(map(lambda x: x.to_json(), products))
    return jsonify({"products":json_products})

@app.route("/upload_product", methods=["POST"])

def create_product():
    print("request received")
    id = request.json.get("id")
    full_desc = request.json.get("fullDesc")
    full_dim = request.json.get("fullDim")
    rrp = request.json.get("rrp")
    moMarking = request.json.get("moMarking")
    runflat = request.json.get("runflat")
    imgUrl = request.json.get("imgUrl")
    logo = request.json.get("logo")
    brand =request.json.get("brand")


    if not id or not full_desc or not full_dim:
        return (
            jsonify({"message":"Part number, description, dimension can not be blank"})
        )
    
    new_product = Tire(id=id,full_desc=full_desc,full_dim=full_dim, rrp=rrp, moMarking=moMarking,runflat=runflat,imgUrl=imgUrl,logo=logo,brand=brand)
    print("New Product created")
    try:
        db.session.add(new_product)
        db.session.commit()
        print("committed to db")
    except Exception as e:
        print({"message":str(e)})
        return jsonify({"message":str(e)})
    print({"message":"products created"})
    return jsonify({"message":"products created"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug = True)