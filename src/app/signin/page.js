'use client';

import { useFormState } from 'react-dom';
import { doSignin } from '../actions';

const initialState = {
  message: '',
}

export default function SigninPage() {
  const [state, formAction] = useFormState(doSignin, initialState);
  return (
    <div>
      <h1>Signin Page</h1>
      <form action={formAction}>
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password"/>
        <button type="submit">Signin</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </div>
  );
}