'use client';
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Client, fql } from 'fauna';

export default function RoomList({ rooms }) {

  const client = new Client({ 
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY 
  });


  const [existingRooms, setExistingRooms] = useState(rooms);
  const streamRef = useRef(null);


  const fetchRooms = async () => {
    try {
      if(!streamRef.current) {
        const stream = await client.stream(fql`Room.all().toStream()`);
        streamRef.current = stream;
        for await (const event of stream) {
          console.log(event);
          switch(event.type) {
            case "add":
            case "update":
              setExistingRooms(prev => {
                const existingRoom = prev.findIndex(room => 
                  room.id === event?.data.id
                );
                if (existingRoom === -1) {
                  return [...prev, event.data];
                } else {
                  return prev.map(room => {
                    if (room.id === event?.data.id) {
                      return event.data;
                    }
                    return room;
                  });
                }  
              })
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!client) return;
    fetchRooms();
  }, []);


  return (
    <div>
      <h2>All Rooms</h2>
      {existingRooms.map(room => (
        <div key={room.id}>
          <Link href={`/rooms/${room.id}`}>{room.name}</Link>
        </div>
      ))}
    </div>
  )
}