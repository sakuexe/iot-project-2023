// MQTT clientID saa joka kerta uuden arvon, jotta ei tule ongelmia saman nimisen clientin kanssa
// Tämä toimii antamalla nimen perään myös ajanhetki
const clientId = 'JNSK-mqttjs_' + new Date().getTime()
console.log('ClientID: ' + clientId)
// MQTT broker
const host = 'ws://test.mosquitto.org:8080'
// MQTT topic
const topic = 'IoTProjekti/JNSK/kahvinkeitin'
const htmlOutput = document.querySelector('output')
const topicElement = document.querySelector('#topic')

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
	 // kun clientti suljetaan, lähetetään viesti
  will: {
    topic: 'WillMsg',
    payload: 'Yhteys katkeutui',
    qos: 0,
    retain: false
  },
}

console.log('Yhdistetään brokeriin: ' + host)

// tee yhteys mqtt brokeriin
const client = mqtt.connect(host, options)
topicElement.innerHTML = 'Connecting...'

// jos tulee virhe:
client.on('error', (err) => {
  console.log('Connection error: ', err)
  topicElement.innerHTML = 'Connection Failed'
  client.end()
})

// kun yhdistämme uudelleen
client.on('reconnect', () => {
  console.log('Reconnecting...')
  topicElement.innerHTML = 'Reconnecting...'
})

// kun yhteys on saatu
client.on('connect', () => {
  console.log('Client connected:' + clientId)
  // Subscribe:taan topicille
	// topic on valittu rivillä 8
  client.subscribe(topic, { qos: 0 })
  topicElement.innerHTML = topic
})

// kun viesti vastaanotetaan topicilla
client.on('message', (topic, payloadJSON, packet) => {
  console.log('Viesti vastaanotettu.')
	console.log('Topic: ' + topic)
  // poista vanhin viesti, kun viestejä on yli 5
  removeOldMessages(5)
	// muutetaan JSON string Javascript objektiksi
	payload = JSON.parse(payloadJSON.toString())
	console.table(payload)
	dataRivi = document.createElement('div')
	dataRivi.setAttribute('class', 'payload-div p-2 text-green-500')
	dataRivi.innerHTML += `<p>Time: <span class="font-semibold">${payload.time}</span></p>`
	dataRivi.innerHTML += `<p>Temperature: <span class="font-semibold">${payload.temperature}<span>&#8451;</p>`
	htmlOutput.appendChild(dataRivi)
})

function removeOldMessages(amount = 1) {
  const oldMessages = document.querySelectorAll('.payload-div')
  if (oldMessages.length >= amount) {
    oldMessages[0].remove()
  }
}