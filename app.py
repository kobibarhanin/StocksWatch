from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/')
def get():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port='3100')