from config import db

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
    

