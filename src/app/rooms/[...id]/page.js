import styles from "../../page.module.css";
import MessageForm from "../../components/MessageForm";
import MessageList from "../../components/MessageList";
import { Client, fql } from "fauna";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Room({ params }) {

  const token = cookies().get('chat-app')?.value;
  if (!token) {
    redirect('/signin')
  }

  const client = new Client({
    secret: token
  })

  const response = await client.query(fql`
    let room = Room.byId(${params.id[0]})
    let messages = Message.where(.room == room)
    {
      name: room.name,
      messages: messages
    }
  `)

  console.log(response)

  const messages = response.data.messages.data.map(msg => ({
    text: msg.text,
    id: msg.id
  }))

  return (
    <div className={styles.main}>
      <h1>Welcome, {response.data.name}</h1>
      <MessageList messages={messages} roomId={params.id[0]} token={token}/>
      <MessageForm roomId={params.id[0]} token={token}/>
    </div>
  )
}