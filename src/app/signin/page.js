export default function SigninPage() {

  const doSignin = (event) => {
  };
  return (
    <div>
      <h1>Signin Page</h1>
      <form action={doSignin}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}