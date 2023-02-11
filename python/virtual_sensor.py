import paho.mqtt.client as mqtt
import time
import json

# MQTT Settings
mqtt_host = "test.mosquitto.org"
client = mqtt.Client(client_id="JNSK-VirtualSensor-01", clean_session=True)
client.connect(mqtt_host, port=1883, keepalive=60)
topic = "IoTProjekti/JNSK/kahvinkeitin"

# interval of publishing
interval = 2

for i in range(1, 11):
	user_data = {
		"time" : time.time(),
		"sensor_id" : "SakuK-VirtualSensor-01",
		"sensor_type" : "VirtualSensor",
		"sensor_value" : i*10,
		"message" : "Hello World!"
	}

	publish_json = json.dumps(user_data)

	client.publish(topic=topic, payload=publish_json)
	print("published to:", topic)

	time.sleep(interval)

client.disconnect()