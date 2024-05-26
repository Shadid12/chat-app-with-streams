'use client';
import { useState } from 'react';
import { Client, fql } from 'fauna';

export default function MessageForm({ roomId }) {
  const [msg, setMsg] = useState('');

  const client = new Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY
  });

  const createMessage = async (e) => {
    e.preventDefault();
    await client.query(fql`
      Message.create({ text: ${msg}, room: Room.byId(${roomId}) })
    `);

    setMsg('');
  };

  return (
    <form onSubmit={createMessage}>
      <input 
        type="text" 
        placeholder="Message" 
        value={msg} 
        onChange={e => {
          setMsg(e.target.value);
        }}
      />
      <button type="submit">Send</button>
    </form>
  )
}