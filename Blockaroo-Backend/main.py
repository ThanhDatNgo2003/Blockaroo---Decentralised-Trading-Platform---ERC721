import typing
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
from setting import db_config
from web3 import Web3, HTTPProvider
import time
import os

# Import solcx in the FastAPI
from solcx import compile_standard, install_solc

# DB
import mysql.connector

app = FastAPI()

origins = ["*"]
 



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

# Sell Interface
class SellModel(BaseModel):
    token_id: int
    price: float

# Buy Interface
class BuyModel(BaseModel):
    token_id: int
    from_address: str
    to_address: str
    
    # W3 Config
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

admin_address = "0x29606cA83057851DF501B48c5450ee5E12e956bE"

admin_private_key = "0xb26ef8524b1831db27fc8ef739ab4f61854fff4e1d1a1c6715512701f77a8b16"

with open("./BlockarooSmartContract.sol", "r") as file:
        smart_contract_file = file.read()
        
        # Uses the compile_standard method of the solcx library to compile the contract source file and stores the result of the compilation into the variable compiled_sol
        
install_solc("0.8.0")
compiled_sol = compile_standard(
{
    "language": "Solidity",
    "sources": {"BlockarooSmartContract.sol": {"content": smart_contract_file}},
    "settings": {
        "outputSelection": {
            "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
        }
    },
},
    solc_version="0.8.0",
)

# Get Compilation Results
with open("compiled_code.json", "w") as file:
    json.dump(compiled_sol, file)
    
    # Get bytecode and abi
bytecode = compiled_sol["contracts"]["BlockarooSmartContract.sol"]["BlockarooSmartContract"]["evm"]["bytecode"]["object"]
abi = compiled_sol["contracts"]["BlockarooSmartContract.sol"]["BlockarooSmartContract"]["abi"]

# Deploying the Contract
BlockarooSmartContract = w3.eth.contract(abi=abi, bytecode=bytecode)
    

with open('./blockaroodata/ItemsNFT.json') as file:
    items = json.load(file)
if "CONTRACT_ADDRESS" not in os.environ:
    nonce = w3.eth.get_transaction_count(admin_address)
    transaction = BlockarooSmartContract.constructor().build_transaction(
        {
            "chainId": 1337,
            "gasPrice": w3.eth.gas_price,
            "from": admin_address,
            "nonce": nonce,
        })
    transaction.pop('to')
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=admin_private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = None
    while tx_receipt is None:
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        time.sleep(0.1)  # Sleep for 1 second before checking again
        
    os.environ["CONTRACT_ADDRESS"] = tx_receipt["contractAddress"]
    print (os.environ["CONTRACT_ADDRESS"])

def init ():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        
        query = '''CREATE DATABASE IF NOT EXISTS blockaroo_db;'''
        cursor.execute(query)
        
        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS wallets (
            wallet_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            wallet_address VARCHAR(100) NOT NULL,
            private_key VARCHAR(100) NOT NULL
        );'''
        cursor.execute(query)
        
        query = '''CREATE TABLE IF NOT EXISTS accounts (
            user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            wallet_id INT,
            FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id)
        );'''
        cursor.execute(query)

        query = '''CREATE TABLE IF NOT EXISTS NFTItems (
            token_id INT AUTO_INCREMENT PRIMARY KEY,
            item_name VARCHAR(50) NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            price INT UNSIGNED NOT NULL,
            onsell BOOLEAN NOT NULL,
            artist VARCHAR(50) NOT NULL,
            wallet_id INT,
            FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id)
        );'''
        cursor.execute(query)     
        
        cursor.execute('''SELECT COUNT(*) FROM accounts''')
        count = cursor.fetchone()[0]

        if count == 0:
            query = '''
            INSERT IGNORE INTO wallets (wallet_address, private_key)
            VALUES 
            ('0x29606cA83057851DF501B48c5450ee5E12e956bE', '0xb26ef8524b1831db27fc8ef739ab4f61854fff4e1d1a1c6715512701f77a8b16'),
            ('0x7C180371Bff138a5d1BCf84B2b4F4a262372D8f2', '0xa3aecce0ab0bfcc734c7265637930f3648bf5451ee7fe175b9619fba09052c73'),
            ('0x5316D86427C76E9c2284846aE4DC3D25628FA68e', '0xab217227ec6dbe5aba2fd10d08354357a4a0101deb969e78674521640b53e725'),
            ('0xfc8836c7Bfb51ef5f1ACD4997B778b04d84da51a', '0x53898ebf4d44fde6e2e91b63c1f36d88453115bb36228dab3f1d61e6b0c4ac85'),
            ('0x34321D366E65B6ccbda1E746bcb707c2161814c1', '0x39fbd757216f4db78ac4a8283ee7cad74f0c9b745eee5b95f6e24ba528ab025d'),
            ('0xF3AC1A3cC5363438D26E96Ab1d6fFC7FCa70D6d5', '0x2810eee4a519b70c777d1e14dbf6eb40f497877605eb5a4c9cda9d005dd82ffe'),
            ('0x68F5AebEAF2A6Ce66EFB4FDeFDA6936C7bC2980F', '0xc62c981d78388f5ad0bbdfeef211eb676c21512fb518af6469e8368caa522266'),
            ('0xF6c20fed40AC02306417B2Edd7bD9dD5c4be2AE4', '0x643cd8bc5f94015ad1943d9bd4a93aedd9e06faa4a099cfedd3cefccb54d3ee9'),
            ('0x675d74c2B17d08eA0d4e41fDABF100369e05B458', '0xf02f7365fd005cc30c2f6d05060ae89ec86a2cd0609be7f0f52f0fdf028de743'),
            ('0xC6B33f928a5da28A9b379249A69A0F7A402ef6bA', '0x53116e6dda4dcd971e3b00c3331ed281d324b0f260c3685d21f20c9ccb3bd63a'),
            ('0x2492A477F51CD31476A41CD2039Fd304a22a5c2d', '0x83906450ec0d37466c44dc28d6dc782caada6e4d40d4333903d6be533099c2a9'),
            ('0x82FD75BCB7d5ACe1Bf7f2d5002B62162ab689500', '0xac621faafe2d1b684ec8f1db0021dd0337a38d46a94f386495e222c70ac41354'),
            ('0xa3D58c1aee29c7be7Be30728f588F64b71866833', '0x7581b644c89475aafd614b07cc6c5eaac5241ed1adf61d4cad465e34d0878342'),
            ('0x2d1bEAbD2Fe3772426143BE220c4051e8497579A', '0x4fc962d3b262fa811d18814c4b29d748ff4f7ca5a51494f058ee61cb48c5c458'),
            ('0x6cECf4Fc8EddeFf9A6db793Fa05255B65c80186f', '0x146d564a7c7a2844a57fff82d5f30e64c675a96f2935919cb5352ffdadde20e6'),
            ('0x9aafA94B3d84AF47dD490B8FB6bE2F858d0E2E0c', '0x1c4e5422b8af4c5aaebe33e90af14af4b889c148784054edad5ce85d04132551'),
            ('0x4234af56D843d1D11B6aa1C0ecaf85089Cc35C99', '0x4b1d7d11fa82199e18eb89f5f94fb4f95b9e11fab2e319eef14134e3ed5797a3'),
            ('0x7724782F2b44E978a6c650664693e05Aeb0d38eB', '0x8697ac8efc176c6462c6bb563dcc5264979be199d9535547ef630e94259ee148'),
            ('0xD197aE6acb1c87126D7768a13feDD78043758049', '0xcb55a30527afd20a872ec9d0d35b863db9c1306000679b5de864fa240dfb538d'),
            ('0x995ECf48f9b734b3D4Aa2c17F8effc88F64D94A8', '0x73a844da7a99cb442b3b49af5695b4d62432be97907fa14379da15461deb4332');'''
            cursor.execute(query)
        
        cursor.execute('''SELECT COUNT(*) FROM accounts''')
        count = cursor.fetchone()[0]

        if count == 0:
            query = '''
                INSERT INTO accounts (username, email, password, wallet_id)
                VALUES ('admin', 'admin@gmail.com', '1234', '1');'''
            cursor.execute(query) 
          
        query = '''CREATE TABLE IF NOT EXISTS TransactionHistory (
            transaction_id INT AUTO_INCREMENT PRIMARY KEY,
            token_id INT NOT NULL,
            event VARCHAR(100) NOT NULL,
            from_address VARCHAR(50) NOT NULL,
            to_address VARCHAR(50) NOT NULL,
            date TIMESTAMP NOT NULL,
            transaction_hash VARCHAR(50) NOT NULL,
            FOREIGN KEY (token_id) REFERENCES NFTItems(token_id)
        );'''
        cursor.execute(query)
    

        
        cursor.execute('''SELECT COUNT(*) FROM NFTItems''')
        count = cursor.fetchone()[0]

        if count == 0:
            
                # If NFTItems table is empty, insert data
            for item in items:
                sql = '''INSERT INTO NFTItems (item_name, image_url, price, onsell, artist, wallet_id) 
                         VALUES (%s, %s, %s, %s, %s, %s)'''
                val = (item['item_name'], item['image_uri'], item['price'], item['onsell'], item['artist'], item['wallet_id'])
                cursor.execute(sql, val)
                sql = '''SELECT wallet_address, private_key FROM wallets WHERE wallet_id = %s'''
                cursor.execute(sql, (item["wallet_id"],))
                result = cursor.fetchone()
                if(result != None):
                    key = dict(zip(cursor.column_names, result))
                    try:
                        price_in_wei = int(item['price'] * 10**18)
                        nonce = w3.eth.get_transaction_count(admin_address)
                        blockaroo_smart_contract = w3.eth.contract(address=os.environ["CONTRACT_ADDRESS"], abi=abi)
                        print("Price:", item['price'])
                        mint_transaction = blockaroo_smart_contract.functions.mint(key['wallet_address'], price_in_wei).build_transaction(
                        {
                            "chainId": 1337,
                            "gasPrice": w3.eth.gas_price,
                            "from": key["wallet_address"],
                            "nonce": nonce,
                        })     
                        signed_tx = w3.eth.account.sign_transaction(mint_transaction, private_key=key["private_key"])
                        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
                        tx_receipt = None
                        while tx_receipt is None:
                            tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                            time.sleep(0.1)  # Sleep for 1 second before checking again
                        
                        # print (tx_receipt["contractAddress"])
                        # print (os.environ["CONTRACT_ADDRESS"])
                        
                    
                        # blockaroo_smart_contract.functions.getPrice(10).call()
                        
                          
                        # contract_address = tx_receipt["contractAddress"]
                        
                        # query = "INSERT IGNORE INTO transaction_history(contract_address, details) VALUES (%s, %s);"
                        # tx_receiptDict = dict(tx_receipt)
                        # txnJSON = w3.to_json(tx_receiptDict)
                        # value = (contract_address, txnJSON)
                        
                        # cursor.execute(query, value)
                        # connection.commit()

                    except Exception as error:
                        print(error)

            print("Init Success")

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
        
        query = '''USE blockaroo_db;'''
        cursor.execute(query)

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT username, password FROM accounts WHERE username=%s AND password=%s"
        values = (account.username, account.password)

        # Execute the SQL query
        cursor.execute(query, values)
                
        # Fetch all the rows
        result = cursor.fetchone()
        print(account.username)

        query = "SELECT w.wallet_address FROM wallets w INNER JOIN accounts a ON a.wallet_id = w.wallet_id WHERE a.username = %s"
        value = (account.username,)
        cursor.execute(query, value)
        wallet_address = cursor.fetchone()

        # Close the cursor  
        cursor.close()
        connection.close()

        if result:
            username = result[0]  # Extract username from the result
            return {"message": f"Welcome back, {username}", "username": username, "wallet_address": wallet_address}
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
        
        query = '''USE blockaroo_db;'''
        cursor.execute(query)

        cursor.execute('''SELECT COUNT(*) FROM accounts''')
        count = cursor.fetchone()[0]    
            
        # Define the SQL query to retrieve data (e.g., all assets)
        query = "INSERT INTO accounts (username, email, password, wallet_id) VALUES (%s, %s, %s, %s)"
        
        # Increment the wallet_id for the new user
        values = (account.username, account.email, account.password, (count + 1))

        # Execute the SQL query
        cursor.execute(query, values)
        
        

        # Commit the changes to the database
        connection.commit()

        # Close the cursor
        cursor.close()

        return {"message": f"Welcome onboard, {account.username}"}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.post("/user/")
async def get_account(account: Account):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
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


@app.get("/NFTitems")
def get_NFTitems():
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        query = '''USE blockaroo_db;'''
        cursor.execute(query)

        # Define the SQL query to retrieve NFT items
        query = "SELECT N.token_id, N.token_id, N.item_name, N.image_url, N.price, N.onsell, N.artist, w.wallet_address, A.username FROM NFTitems N INNER JOIN accounts A ON N.wallet_id = A.wallet_id INNER JOIN wallets w ON w.wallet_id = A.wallet_id;"

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
    
@app.put('/sellnft/')
def update_sell(sell: SellModel):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
        # Define the SQL query to update the NFT item
        query = "UPDATE NFTitems SET onsell = true, price = %s WHERE token_id = %s"
        values = (sell.price, sell.token_id)
        
        blockaroo_smart_contract = w3.eth.contract(address=os.environ["CONTRACT_ADDRESS"], abi=abi)
        
        new_price_in_wei = int(sell.price * 10**18)
        
        blockaroo_smart_contract.functions.updatePrice(sell.token_id, new_price_in_wei).call()
        
        
        # Execute the SQL query
        cursor.execute(query, values)
        
        # Commit the changes to the database
        connection.commit()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"message": "NFT item updated successfully"}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.put('/buynft/')
def buy_nft(buy: BuyModel):
    try:
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()
        print(buy.from_address, buy.to_address)
        query = '''USE blockaroo_db;'''
        cursor.execute(query)
        
        query = "SELECT private_key FROM wallets WHERE wallet_address = %s"
        values = (buy.from_address,)
        cursor.execute(query, values)
        user_private_key = cursor.fetchone()[0]
        print (user_private_key)
        try:
            nonce = w3.eth.get_transaction_count(admin_address)
            blockaroo_smart_contract = w3.eth.contract(address=os.environ["CONTRACT_ADDRESS"], abi=abi)
            buy_transaction = blockaroo_smart_contract.functions.transfer(buy.from_address, buy.to_address, buy.token_id).build_transaction(
            {
                "chainId": 1337,
                "gas": 2000000,
                "gasPrice": w3.eth.gas_price,
                "nonce": nonce,
            })     
        
            signed_tx = w3.eth.account.sign_transaction(buy_transaction, private_key=user_private_key)
            tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            tx_receipt = None
            while tx_receipt is None:
                tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                time.sleep(0.5)  # Sleep for 1 second before checking again
        except Exception as e:
            print(e)
            return {f"Error: {e}"}

        
        # Define the SQL query to update the NFT item
        # Retrieve the wallet_id corresponding to the wallet_address
        query = "SELECT wallet_id FROM wallets WHERE wallet_address = %s"
        values = (buy.to_address,)
        cursor.execute(query, values)
        wallet_id = cursor.fetchone()[0]

        # Update the wallet_id of the NFT item in the NFTitems table
        query = "UPDATE NFTitems SET onsell = false, wallet_id = %s WHERE token_id = %s"
        values = (wallet_id, buy.token_id)
        cursor.execute(query, values)

        
        # Execute the SQL query
        cursor.execute(query, values)
        
        # Commit the changes to the database
        connection.commit()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"message": "Transaction confirmed successfully"}
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
@app.get('/getbalance/')
def get_balance(wallet_address):
    # Get the balance of the wallet address in Wei
    balance_wei = w3.eth.get_balance(wallet_address)

    # Convert the balance from Wei to Ether
    balance_eth = w3.from_wei(balance_wei, 'ether')

    print("Balance (Ether):", balance_eth)
    
    return {"wallet_balance": balance_eth}


init()
