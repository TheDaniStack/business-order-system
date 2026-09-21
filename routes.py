from app import app
from flask import render_template
from products import products


@app.route("/")
def home():
  return render_template(
    "index.html",
    products=products
  )


@app.route("/products")
def products_list():
  return render_template(
    "products.html",
    products=products
  )

@app.route("/cart")
def cart():
  return render_template("cart.html")