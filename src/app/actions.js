'use server';

import { Client, fql } from 'fauna'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function doSignin(prevState, formData) {

  const client = new Client({ secret: process.env.NEXT_PUBLIC_FAUNA_KEY });

  const email = formData.get('email');
  const password = formData.get('password');
  if (!email || !password) {
    return { message: 'Email and password are required' };
  }

  try {
    const response = await client.query(fql`
      UserLogin(${email}, ${password})
    `)
    console.log(response);
    cookies().set('chat-app', response.data.secret, {
      expires: Date.now() + 1000 * 60 * 60
    })
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred' };
  }

  redirect('/')

}