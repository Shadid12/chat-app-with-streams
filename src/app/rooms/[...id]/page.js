import styles from "../../page.module.css";
import { Client, fql } from "fauna";

export default async function Room({ params }) {

  const client = new Client({
    secret: process.env.NEXT_PUBLIC_FAUNA_KEY
  })

  const response = await client.query(fql`
    Room.byId(${params.id[0]})
  `)

  return (
    <div className={styles.main}>
      <h1>Welcome, {response.data.name}</h1>
    </div>
  )
}