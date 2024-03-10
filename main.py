import typing
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# DB
import mysql.connector

app = FastAPI()

origins = ["*"]

# MySQL database connection configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "020503",
    "database": "THANHDATNGO"
}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()

# Account Interface
class Account(BaseModel):
    user_id: typing.Union[int, None] = None
    username: str
    email: typing.Union[str, None] = None
    password: typing.Union[str, None] = None

def init ():
    try:
        query = '''CREATE TABLE IF NOT EXISTS account (
            user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(50) NOT NULL
        );'''
        cursor.execute(query)
    except Exception as e:
            print("Error:", e)
@app.post("/login/")
def login(account: Account):
    try:
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT username, password FROM account WHERE username=%s AND password=%s"
        values = (account.username, account.password)

        # Execute the SQL query
        cursor.execute(query, values)

        # Fetch all the rows
        result = cursor.fetchone()
        print(account.username)
        # Close the cursor  
        cursor.close()

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
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "INSERT INTO account (username, email, password) VALUES (%s, %s, %s)"
        values= (account.username, account.email, account.password)

        # Execute the SQL query
        cursor.execute(query, values)

        # Commit the changes to the database
        connection.commit()

        # Close the cursor
        cursor.close()

        return {"message": f"Registration successful! Now you can log in."}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.post("/user/")
async def get_account(account: Account):
    try:

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT username FROM account WHERE username='" + account.username + "';"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchone()
        
        if (result == None):
            # Close the cursor
            cursor.close()
            return {"exist": False}
        else:
            # Close the cursor
            cursor.close()
            return {"exist": True}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
init()