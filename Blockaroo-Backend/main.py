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
    "password": "020503",
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
    


with open('./src/blockaroodata/ItemsNFT.json') as file:
    assets = json.load(file)

def init ():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        query = '''CREATE DATABASE IF NOT EXISTS blockaroo_db;'''
        cursor.execute(query)
        
        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS accounts (
            user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL
        );'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS wallets (
            user_id INT NOT NULL,
            wallet_address VARCHAR(100) PRIMARY KEY,
            private_key VARCHAR(100) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES accounts (user_id)
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
init()