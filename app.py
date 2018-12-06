import flask
import pymysql.cursors
import sqlite3
from flask import Flask, current_app, g, request, session, redirect

DATABASE = 'accounts.db'

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = 'ham sammy'

# Connect to Database
def connect_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

# Starts up homepage
@app.route("/")
def home():
    return app.send_static_file("index.html")

# Handles login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['email'] = request.form['email']
        session['password'] = request.form['password']
        g.db = connect_db()
        cursor = g.db.execute('select * from ACCOUNTS where EMAIL = ?' , (session['email'],))
        ham = [dict(id=row[0], email=row[1], password=row[2]) for row in cursor.fetchall()]
        if ham[0]['password'] == session['password']:
            g.db.close()
            return redirect('#/account')
        else:
            g.db.close()
            return redirect('#/login')
    return redirect('#/account')

# Handles Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        session['email'] = request.form['email']
        session['password'] = request.form['password']
        g.db = connect_db()
        g.db.execute('INSERT INTO ACCOUNTS (EMAIL, PASSWORD) VALUES (?,?)', (session['email'], session['password']))
        g.db.commit()
        g.db.close()
    return redirect('#/account')

# Handles changing account information
@app.route('/account', methods=['GET', 'POST'])
def getAccount():
    if request.method == 'POST':
        g.db = connect_db()
        g.db.execute("UPDATE ACCOUNTS SET EMAIL = (?), PASSWORD = (?) WHERE EMAIL = (?) ", (request.form['email'], request.form['password'], session['email']))
        g.db.commit()
        g.db.close()
    return redirect('#/account')

def main():
    app.run(host="0.0.0.0",
            port=8000,
            use_reloader=True,
            debug=True
            )

if __name__ == "__main__":
    main()
