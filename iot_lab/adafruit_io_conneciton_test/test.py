from Adafruit_IO import Client, Data
import random
import time
from dotenv import load_dotenv
import os

load_dotenv()
# Replace with your Adafruit IO credentials
ADAFRUIT_IO_USERNAME = "premjeet"
KEY = os.getenv('ADAFRUIT_IO_KEY')

# Create an instance of the Adafruit IO Client
aio = Client(ADAFRUIT_IO_USERNAME, KEY)

# Name of the feed you created on Adafruit IO
FEED_NAME = "random-data"

while True:
    # Generate random data
    random_value = random.uniform(10, 100)  # Generate a random float between 10 and 100

    # Send data to Adafruit IO feed
    try:
        aio.send(FEED_NAME, random_value)
        print(f"Data sent to Adafruit IO: {random_value}")
    except Exception as e:
        print(f"Failed to send data: {e}")

    # Wait 10 seconds before sending the next value
    time.sleep(10)