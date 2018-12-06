import sqlite3

# OPEN DATABASE
conn = sqlite3.connect('accounts.db')
print ("Opened database successfully");

# DROPS TABLE AND MAKES A NEW ONE EVERYTIME
conn.execute("DROP TABLE IF EXISTS ACCOUNTS")

# CREATE DATABASE
conn.execute('''CREATE TABLE ACCOUNTS
        (ID             INTEGER PRIMARY KEY AUTOINCREMENT,
         EMAIL          CHAR(50),
         PASSWORD       CHAR(50) )''');
print ("Table created successfully");

# INSERT TO DATABASE
conn.execute("INSERT INTO ACCOUNTS (EMAIL, PASSWORD) VALUES(?, ?)", ("john@doe.com", "johndoe"))
conn.commit()

conn.close()
