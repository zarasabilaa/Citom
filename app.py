from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample data untuk produk
products = [
    {"name": "Molen Rasa Coklat", "price": "Rp 10,000", "image": "images/molen_coklat.jpg"},
    {"name": "Molen Rasa Keju", "price": "Rp 12,000", "image": "images/molen_keju.jpg"},
    {"name": "Molen Rasa Durian", "price": "Rp 15,000", "image": "images/molen_durian.jpg"}
]

# Sample data untuk review
reviews = [
    {"username": "Alia", "comment": "Enak banget, recommended!", "rating": 5},
    {"username": "Budi", "comment": "Suka rasa duriannya, mantap!", "rating": 4},
    {"username": "Citra", "comment": "Coklatnya lezat!", "rating": 5}
]

@app.route('/')
def index():
    return render_template('index.html', products=products, reviews=reviews)

@app.route('/search', methods=['GET'])
def search_product():
    query = request.args.get('query')
    # Filter produk berdasarkan query pencarian
    filtered_products = [p for p in products if query.lower() in p['name'].lower()]
    return jsonify(filtered_products)

@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.json
    reviews.append(data)
    return jsonify({"message": "Review added successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
