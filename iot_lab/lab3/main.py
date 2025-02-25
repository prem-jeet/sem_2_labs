import json, time, random
from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers='localhost:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

while True:
    data = {
        'device_id': f'Device_{random.randint(1,5)}',
        'temperature': round(random.uniform(20, 30), 2),
        'humidity': round(random.uniform(30, 50), 2),
        'timestamp': time.time()
    }
    producer.send('iot_sensors', value=data)
    time.sleep(2)