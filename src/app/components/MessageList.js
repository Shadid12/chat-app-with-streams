export default function MessageList({ messages }) {
  return (
    <div>
      {messages.data.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
    </div>
  )
}
