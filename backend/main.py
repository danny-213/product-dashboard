from flask import request, jsonify
from config import app,db
from models import Tire


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