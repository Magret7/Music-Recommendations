# main.py
from flask import Flask, render_template, request, redirect, url_for, jsonify
# from flask_paginate import Pagination, get_page_parameter
# from app.models import app, db, Artists, Albums, Tracks


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/unitTests')
def unittests():
    return render_template('unitTests.html')


@app.route('/api')
def api():
    return render_template('api.html')


if __name__ == "__main__":
    app.debug = True
    app.run()