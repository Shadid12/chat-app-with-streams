'use client'
import { useState, useEffect, useRef } from 'react';
import { Client, fql } from 'fauna';

export default function MessageList({ messages, roomId }) {
  const [allMessages, setAllMessages] = useState(messages)

  const client = new Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY
  })

  const streamRef = useRef(null)

  const getMessages = async () => {
    try {

      if (!streamRef.current) {
        const stream = await client.stream(fql`
          let room = Room.byId(${roomId})
          Message.where(.room == room).toStream()
        `)
        streamRef.current = stream

        // cycle through the stream events
        for await (const event of stream) {
          console.log(event)
          switch (event.type) {
            case 'add':
              setAllMessages(prev => {
                const existing = prev.findIndex(msg => 
                  msg.id === event?.data.id
                )
                if (existing == -1) {
                  return [...prev, event.data]
                } else {
                  return prev
                }
              })
            case 'default':
              break;
          }
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!client) return
    getMessages()
  }, [])

  return (
    <div>
      {allMessages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
    </div>
  )
}
