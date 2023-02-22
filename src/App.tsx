import { useState } from 'react';
import * as mqtt from 'precompiled-mqtt';

import Payload from './components/payload';
import DataChart from './components/chart';

import github from './images/github-logo.svg';

const clientId: string = 'JNSK-mqttjs_' + new Date().getTime();
const host: string = 'ws://test.mosquitto.org:8080';
const topic: string = 'JNSK/projekti/testing';
const options: object = {
  keepalive: 60,
  clientId: clientId,
  protocolID: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
}
const client = mqtt.connect(host, options);

function App() {

  const [payloads, setPayloads]: any = useState([]);
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
    // add the current time when the message was received
    // to the message object
    message['time'] = new Date().toLocaleTimeString('fi-FI');
    setPayloads([...payloads, message]);
  });

  return (
    <div className='App flex flex-col h-screen justify-between gap-y-10'>
      <header className='bg-green-700 py-5 px-5 text-center my-8 shadow-lg'>
        <p>Jarkko's and Saku's</p>
        <h1 className='font-extrabold text-xl'>Coffee's Temperature Sensor</h1>
        <h2 className='font-bold text-lg'>
          <span className='font-normal text-base italic'>MQTT status: </span>
          {connectionStatus}
        </h2>
      </header>

			<section className='mx-2'>
      {
        // Check if there are any payloads in the state
        // if there are, render the chart and the payload list
        // if not, render a message
        payloads?.length !== 0 ? (
          <div className='max-w-4xl mx-auto grid grid-cols-1 place-content-center md:grid-cols-3'>
            <Payload payloads={payloads}/>
            <DataChart payloads={payloads}/>
          </div>
        ) : (
          <div className='col-span-3 flex flex-col items-center justify-center text-center'>
            <p className='text-2xl font-bold'>No data received yet</p>
            <p className='text-sm italic'>Try brewing some coffee</p>
          </div>
        )
      }
      </section>

      <footer className='py-5 text-center my-8 mx-2'>
        <div className='max-w-sm mx-auto flex flex-col gap-x-4 gap-y-2 justify-evenly xs:flex-row'>
          <a href='https://github.com/sakuexe/iot-project-2023-microcontroller' 
          target='_blank' rel='noreferrer'
          className='flex gap-x-2 mx-auto transition-all hover:brightness-75'>
            <img src={github.toString()} alt="github-logo" />
            Micro-controller
          </a>
          <a href='https://github.com/sakuexe/iot-project-2023' 
          target='_blank' rel='noreferrer'
          className='flex gap-x-2 mx-auto transition-all hover:brightness-75'>
            <img src={github.toString()} alt="github-logo" />
            Frontend / Documentation
          </a>
        </div>
        <p className='text-sm opacity-50 mt-2'>&copy; Jarkko Niemi and Saku Karttunen</p>
      </footer>
    </div>
  );
}

export default App;