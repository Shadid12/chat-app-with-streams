import styles from "./page.module.css";
import { Client, fql } from "fauna";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RoomList from "./components/RoomList";

export default async function Home() {

  const token = cookies().get('chat-app')?.value;

  if (!token) {
    redirect('/signin')
  }

  const client = new Client({ secret: token });
  // server side rendering
  const roomsResponse = await client.query(fql`Room.all()`);

  const rooms = roomsResponse.data?.data ? 
    roomsResponse.data.data.map(room => ({
      id: room.id,
      name: room.name
    })) : [];


  

  const createNewRoom = async (formData) => {
    'use server'
    const token = cookies().get('chat-app')?.value;
    const client = new Client({ 
      secret: token
    });
    try {
      const roomName = formData.get('roomName');
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
        <form action={createNewRoom}>
          <input 
            type="text" 
            placeholder="Room name"
            name="roomName" 
          />
          <button type="submit">Create room</button>
        </form>
        <RoomList rooms={rooms} token={token}/>
      </div>
    </main>
  );
}
