import { Client, fql } from 'fauna'
import { redirect } from 'next/navigation'
export default function SignupPage() {

  const doSignup = async (formData) => {
    'use server'
    const client = new Client({
      secret: process.env.NEXT_PUBLIC_FAUNA_KEY
    })
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await client.query(fql`
        UserRegistration(${username}, ${email}, ${password})
      `)
    } catch (error) {
      console.error(error)
    }

    redirect('/signin')
  }
  
  return (
    <div>
      <h1>Signup Page</h1>
      <form action={doSignup}>
        <input type="text" placeholder="Username" name="username"/>
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password"/>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}