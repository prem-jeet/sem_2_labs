from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)



@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/sensor/motion', methods=['GET', 'POST'])
def motion_data():
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()
    if request.method == 'GET':
        cursor.execute("SELECT * FROM motion")
        rows = cursor.fetchall()
        data = [dict(row) for row in rows]
        connection.close()
        return jsonify(data)

    elif request.method == 'POST':
        cursor.execute("INSERT INTO motion DEFAULT VALUES")
        connection.commit()
        cursor.execute("SELECT * FROM motion WHERE id = (SELECT MAX(id) FROM motion)")
        row = cursor.fetchone()
        data = dict(row)
        connection.close()
        return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)