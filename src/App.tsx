import { useState } from 'react';
import * as mqtt from 'precompiled-mqtt';

import Payload from './components/payload';
import DataChart from './components/chart';

const clientId: string = 'JNSK-mqttjs_' + new Date().getTime();
const host: string = 'ws://test.mosquitto.org:8080';
const topic: string = 'JNSK/projekti/testing';
const options: object = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
}
const client = mqtt.connect(host, options);

function App() {

  const [payloads, setPayloads] = useState(
    [{object: 12.2, ambient: 23.12}, {object: 14.22, ambient: 20.95}]
  );
  const [connectionStatus, setConnectionStatus] = useState('not connected');

  client.on('connect', () => {
    setConnectionStatus('Connected');
    client.subscribe(topic, { qos: 0 })
    console.log('subscribed to topic: ' + topic)
  });
  client.on('reconnect', () => {
    setConnectionStatus('Reconnecting...');
  });
  client.on('disconnect', () => {
    setConnectionStatus('Disconnected...');
  });
  client.on('message', (topic: string, payload: Uint8Array) => {
    const message = JSON.parse(payload.toString());
    console.log('message recieve on topic:', topic)
    setPayloads([...payloads, message]);
  });

  return (
    <div className='App flex flex-col w-full h-screen justify-center gap-y-20'>
      <header className='bg-green-700 py-5 text-center my-8 shadow-lg'>
        <h1 className='font-extrabold text-xl'>IoT Project 2023</h1>
        <p>By Jarkko Niemi & Saku Karttunen</p>
        <h2 className='font-bold text-lg'>{connectionStatus}</h2>
      </header>

      <section className='max-w-4xl mx-auto grid grid-cols-1 place-content-center md:grid-cols-3'>
        <Payload payloads={payloads}/>
        <DataChart />
      </section>

      <footer className='bg-green-700 py-5 text-center my-8'>
        <p>Made as part of the IoT Project course at HAMK Riihimäki</p>
      </footer>
    </div>
  );
}

export default App;