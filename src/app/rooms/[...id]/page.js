import styles from "../../page.module.css";
import MessageForm from "../../components/MessageForm";
import MessageList from "../../components/MessageList";
import { Client, fql } from "fauna";

export default async function Room({ params }) {

  const client = new Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY
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

  return (
    <div className={styles.main}>
      <h1>Welcome, {response.data.name}</h1>
      <MessageList messages={response.data.messages} />
      <MessageForm roomId={params.id[0]} />
    </div>
  )
}