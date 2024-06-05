export default function SignupPage() {

  const doSignup = (event) => {}
  
  return (
    <div>
      <h1>Signup Page</h1>
      <form action={doSignup}>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}