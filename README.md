# Blockaroo Setup Guide

## A. Installation

### Download Required Software
- [Download Anaconda](https://www.anaconda.com/download#downloads)
- [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- [Download Ganache](https://trufflesuite.com/ganache/)

## B. Setup (for Windows 🪟)

### 1. Environment
1. Create a new environment:
    ```sh
    conda create --name blockaroo-env python=3.9
    ```
2. Activate the environment:
    ```sh
    conda activate blockaroo-env
    ```
3. Install `uvicorn` to work as the server:
    ```sh
    conda install conda-forge::uvicorn
    conda install conda-forge::uvicorn-standard
    ```
4. Install `FastAPI`:
    ```sh
    conda install conda-forge::fastapi
    ```
5. Install the dependency to connect to MySQL:
    ```sh
    conda install conda-forge::mysql-connector-python
    ```
6. Install the `web3` package via pip:
    ```sh
    pip install web3
    ```
7. Install `solcx` tool to compile contracts:
    ```sh
    pip install py-solc-x
    ```

### 2. Ganache
There are 2 options for Windows users to set up Ganache workspace:

**OPTION 1 (RECOMMENDED):**
1. Unzip the zip file named `COS30049-Blockaroo.zip` under the deploy folder.
2. Extract the `COS30049-Blockaroo` zip file to the Ganache folder (usually located at):
    ```sh
    C:\Users\user_name\AppData\Roaming\Ganache\ui\workspaces
    ```
3. Open Ganache then run the `COS30049-Blockaroo` workspace.

**OPTION 2:**
1. Move the `COS30049-Blockaroo` folder under the deploy folder to the Ganache folder (usually located at):
    ```sh
    C:\Users\user_name\AppData\Roaming\Ganache\ui\workspaces
    ```
2. Open Ganache then run the `COS30049-Blockaroo` workspace.

## C. Setup (for MacOS 🍎)

### 1. Environment
1. Create a new environment:
    ```sh
    conda create --name blockaroo-env python=3.9
    ```
2. Activate the environment:
    ```sh
    conda activate blockaroo-env
    ```
3. Install `uvicorn` to work as the server:
    ```sh
    conda install uvicorn uvicorn-standard
    ```
4. Install `FastAPI`:
    ```sh
    conda install fastapi
    ```
5. Install the dependency to connect to MySQL:
    ```sh
    conda install -c anaconda mysql-connector-python
    ```

### 2. Ganache
1. Move the `COS30049-Blockaroo` folder under the deploy folder to the Ganache folder using the following command:
    ```sh
    mv ./deploy/COS30049-Blockaroo ~/Library/Application\ Support/Ganache/ui/workspaces
    ```
2. Open Ganache then run the `COS30049-Blockaroo` workspace.

## III. Start the Application
1. Start the command line and clone our project to your local computer:
    ```sh
    git clone https://github.com/ThanhDatNgo2003/Blockaroo---Decentralised-Trading-Platform---ERC721.git
    ```
2. After cloning the project, find `setting.py` in the `Blockaroo-Backend` folder and change the password to connect with your local database.
3. Start the backend server by running this command in the activated conda environment:
    ```sh
    uvicorn main:app --reload
    ```
