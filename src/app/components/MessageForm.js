'use client';
import { useState } from 'react';
import { Client, fql } from 'fauna';

export default function MessageForm({ roomId, token }) {
  const [msg, setMsg] = useState('');

  const client = new Client({
    secret: token
  });

  const createMessage = async (e) => {
    e.preventDefault();
    await client.query(fql`
      let user = Query.identity()
      Message.create({ 
        text: ${msg}, 
        room: Room.byId(${roomId}),
        author: user,
        authorName: user.username
      })
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