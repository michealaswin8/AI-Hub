print("DATABASE TEST STARTED")
import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
print("Database host:", os.getenv("DB_HOST"))
print("Database port:", os.getenv("DB_PORT"))
print("Database user:", os.getenv("DB_USER"))
print("Database name:", os.getenv("DB_NAME"))
print("Password configured:", bool(os.getenv("DB_PASSWORD")))

try:
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "ai_vault")
    )

    print("SUCCESS: MySQL is connected!")
    connection.close()

except mysql.connector.Error as error:
    print("DATABASE CONNECTION FAILED")
    print("Error number:", error.errno)
    print("Error message:", error.msg)