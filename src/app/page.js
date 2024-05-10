'use client'
import styles from "./page.module.css";
import { useState } from "react";
import { Client, fql } from "fauna";

export default function Home() {
  const [roomName, setRoomName] = useState("");

  const client = new Client({ secret: process.env.NEXT_PUBLIC_FAUNA_KEY });

  const createNewRoom = async (e) => {
    e.preventDefault();
    try {
      const newroom = await client.query(fql`
        Room.create({
          name: ${roomName},
        })
      `);
      console.log(newroom);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <form onSubmit={createNewRoom}>
          <input 
            type="text" 
            placeholder="Room name" 
            value={roomName} 
            onChange={(e) => setRoomName(e.target.value)} 
          />
          <button type="submit">Create room</button>
        </form>
      </div>
    </main>
  );
}
