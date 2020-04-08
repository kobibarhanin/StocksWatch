import json
import os

directory = os.path.dirname(os.path.abspath(__file__))

def read_stocks():
    with open(directory+'/stocks_data/stocks.json', 'r') as f:
        return json.load(f)

def write_stocks(stocks):
    with open(directory+'/stocks_data/stocks.json', 'w') as fout:
        json.dump(stocks, fout)

def add_stock(new_stock):
    stocks = read_stocks()
    for stock in stocks:
        if stock['symbol'] == new_stock['symbol']:
            return False
    stocks.append(new_stock)
    write_stocks(stocks)
    return True

def del_stock(stock_symbol):
    stocks = read_stocks()
    for stock in stocks:
        if stock['symbol'] == stock_symbol:
             stocks.remove(stock)
    write_stocks(stocks)

