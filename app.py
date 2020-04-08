from flask import Flask, jsonify, render_template, request
from stocks.stocks import read_stocks, del_stock, add_stock
from shutil import copyfile
import os

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_stocks')
def get_stocks():
    return jsonify(read_stocks())


@app.route('/delete_stock')
def delete_stock():
    stock = request.args.get('stock')
    del_stock(stock)
    return {}


@app.route('/add_new_stock')
def add_new_stock():
    stock = {
        'symbol': request.args.get('symbol'),
        'market': request.args.get('market')
    }
    res = add_stock(stock)
    return jsonify(res)


if __name__ == '__main__':
    if not os.path.isfile('/app/stocks/stocks_data/stocks.json'):
        copyfile('/app/stocks/stocks.json', '/app/stocks/stocks_data/stocks.json')
    app.run(debug=True, host='0.0.0.0', port='3100')