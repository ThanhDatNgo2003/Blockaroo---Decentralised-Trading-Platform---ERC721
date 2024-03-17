A. Installation
● Download Anaconda: https://www.anaconda.com/download#downloads
● Download the MySQL: https://dev.mysql.com/downloads/mysql/
● Download Ganache: https://trufflesuite.com/ganache/
B. Set up (for Windows 🪟)
1. Environment
● Create a new environment:
conda create --name blockaroo-env python=3.9
● Activate the environment:
conda activate blockaroo-env
● Install uvicorn to work as the server:
conda install conda-forge::uvicorn
conda install conda-forge::uvicorn-standard
● Install FastAPI:
conda install conda-forge::fastapi
● Install the dependency to connect MySQL
conda install conda-forge::mysql-connector-python
● Install the web3 package by pip
pip install web3
● Install solcx tool to compile contract
pip install py-solc-x
2. Ganache
There are 2 options for Windows users to set up Ganache workspace:
OPTION 1 (RECOMMENDED):
● Unzip the zip file named COS30049-Blockaroo.zip under deploy folder
● Extract the COS30049-Blockaroo zip file to the Ganache folder (usually located as
following): "C:\Users\user_name\AppData\Roaming\Ganache\ui\workspaces"
● Open Ganache then run COS30049-Blockaroo workspace
OPTION 2:
● Move the COS30049-Blockaroo folder under deploy folder to the Ganache folder
(usually located as following):
"C:\Users\user_name\AppData\Roaming\Ganache\ui\workspaces"
● Open Ganache then run COS30049-Blockaroo workspace
C. Set up (for MacOS 🍎)
1. Environment
● Create a new environment:
conda create --name blockaroo-env python=3.9
● Activate the environment:
conda activate blockaroo-env
● Install uvicorn to work as the server:
conda install uvicorn uvicorn-standard
● Install FastAPI:
conda install fastapi
● Install the dependency to connect MySQL
conda install -c anaconda mysql-connector-python
2. Ganache
● Move the COS30049-Blockaroo folder under deploy folder to the Ganache folder by
using the following code:
mv ./deploy/COS30049-Blockaroo ~/Library/Application \Support/Ganache/ui/workspaces
● Open Ganache then run COS30049-Blockaroo workspace
III. Start the appilcation:
● Start command line and clone our project to your local computer by the code below 👇
git clone
https://github.com/ThanhDatNgo2003/Blockaroo---Decentralised-Trading-Platfo
rm---ERC721.git
● After finishing cloning the project, find setting.py in the Blockaroo-Backend folder then
change the password to connect with your local database
● Start the backend server by running this command in the activated conda environemt
(env)
uvicorn main:app --reload
