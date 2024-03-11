import typing
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json

# DB
import mysql.connector

app = FastAPI()

origins = ["*"]

# MySQL database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Taikhoandabihack@0805",
}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Account Interface
class Account(BaseModel):
    user_id: typing.Union[int, None] = None
    username: str
    email: typing.Union[str, None] = None
    password: typing.Union[str, None] = None
    


with open('./blockaroodata/ItemsNFT.json') as file:
    items = json.load(file)

def init ():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        query = '''CREATE DATABASE IF NOT EXISTS blockaroo_db;'''
        cursor.execute(query)
        
        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS wallets (
            wallet_address VARCHAR(100) PRIMARY KEY,
            private_key VARCHAR(100) NOT NULL
        );'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS accounts (
            user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            wallet_address VARCHAR(50),
            FOREIGN KEY (wallet_address) REFERENCES wallets(wallet_address)
        );'''
        cursor.execute(query)

        query = '''CREATE TABLE IF NOT EXISTS NFTItems (
            item_id INT AUTO_INCREMENT PRIMARY KEY,
            token_id VARCHAR(255) UNIQUE NOT NULL,
            item_name VARCHAR(50) NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            onsell BOOLEAN NOT NULL,
            artist VARCHAR(50) NOT NULL,
            wallet_address VARCHAR(100) NOT NULL,
            FOREIGN KEY (wallet_address) REFERENCES wallets(wallet_address)
        );'''
        cursor.execute(query)      
          
        query = '''CREATE TABLE IF NOT EXISTS TransactionHistory (
            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
            token_id VARCHAR(50) NOT NULL,
            event VARCHAR(100) NOT NULL,
            from_address VARCHAR(50) NOT NULL,
            to_address VARCHAR(50) NOT NULL,
            date TIMESTAMP NOT NULL,
            contract_address VARCHAR(50) NOT NULL,
            FOREIGN KEY (token_id) REFERENCES NFTItems(token_id)
        );'''
        cursor.execute(query)
        
        query = '''INSERT IGNORE INTO wallets (wallet_address, private_key)
            VALUES 
            ('0x995ECf48f9b734b3D4Aa2c17F8effc88F64D94A8', '0x73a844da7a99cb442b3b49af5695b4d62432be97907fa14379da15461deb4332');'''
        cursor.execute(query)

        
        cursor.execute('''SELECT COUNT(*) FROM NFTItems''')
        count = cursor.fetchone()[0]

        if count == 0:
            # If NFTItems table is empty, insert data
            for item in items:
                sql = '''INSERT INTO NFTItems (token_id, item_name, image_url, price, onsell, artist, wallet_address) 
                         VALUES (%s, %s, %s, %s, %s, %s, %s)'''
                val = (item['token_id'], item['item_name'], item['image_uri'], item['price'], item['onsell'], item['artist'], item['wallet_address'])
                cursor.execute(sql, val)

            connection.commit()

        
        cursor.close()
        connection.close()
    except Exception as e:
            print("Error:", e)
@app.post("/login/")
def login(account: Account):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT username, password FROM accounts WHERE username=%s AND password=%s"
        values = (account.username, account.password)

        # Execute the SQL query
        cursor.execute(query, values)

        # Fetch all the rows
        result = cursor.fetchone()
        print(account.username)
        # Close the cursor  
        cursor.close()
        connection.close()

        if result:
            username = result[0]  # Extract username from the result
            return {"message": f"Welcome back, {username}", "username": username}
        else:
            return {"error": f"Invalid Username or password. Please try again."}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

@app.post("/signup/")
def signup(account: Account):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "INSERT INTO accounts (username, email, password) VALUES (%s, %s, %s)"
        values= (account.username, account.email, account.password)

        # Execute the SQL query
        cursor.execute(query, values)

        # Commit the changes to the database
        connection.commit()

        # Close the cursor
        cursor.close()
        connection.close()

        return {"message": f"Registration successful! Now you can log in."}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.post("/user/")
async def get_account(account: Account):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT username FROM accounts WHERE username='" + account.username + "';"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchone()
        
        if (result == None):
            # Close the cursor
            cursor.close()
            connection.close()
            return {"exist": False}
        else:
            # Close the cursor
            cursor.close()
            connection.close()
            return {"exist": True}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
from fastapi import FastAPI
import mysql.connector

app = FastAPI()

# Assuming you have established a connection object named 'connection'

@app.get("/NFTitems")
def get_NFTitems():
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve NFT items
        query = "SELECT item_id, token_id, item_name, image_url, price, onsell, artist, wallet_address FROM NFTitems;"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        NFTitems = [dict(zip(cursor.column_names, row)) for row in result]
        
        # Close the cursor and the database connection
        cursor.close()

        if (len(NFTitems) == 0):
            return {"message": "No NFT items available!"}
        else:
            return NFTitems
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


init()