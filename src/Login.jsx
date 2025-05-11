// 📁 src/pages/Login.jsx
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { LOGIN } from './graphql/schema';
const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
      redirectUrl
    }
  }
`;

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [login] = useMutation(LOGIN);
  // const [login] = useMutation(LOGIN, {
  //   onCompleted: ({ login: { token, user } }) => {
  //     localStorage.setItem('token', token); // Store token only
  //     navigate(user.role === 'ADMIN' ? `/admin/${user.id}` : `/student/${user.id}`);
  //   },
  //   onError: (err) => alert(`Login failed: ${err.message}`),
  // });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await login({ variables: form });
      // const { token, user, redirectUrl } = res.data.login;

      // localStorage.setItem('token', token);
      // localStorage.setItem('currentUser', JSON.stringify(user));

    
      // if (user.role === 'admin') {
      //   navigate(`/admin/${user.id}`);
      // } else {
      //   navigate(`/student/${user.id}`);
      // }
      await login({ variables: {username, password}});
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-black flex items-center  justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-lg w-80 text-white logind">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

        <label htmlFor="username" className="block text-sm ">Username</label>
        <input
          type="text"
          id="username"
          className="w-full p-2 mt-1 rounded bg-zinc-800"
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label htmlFor="password" className="block text-sm mt-4">Password</label>
        <input
          type="password"
          id="password"
          className="w-full p-2 mt-1 rounded bg-zinc-800"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full mt-6 p-2 bg-green-600 rounded hover:bg-green-500"
        >
          Sign In
        </button>

        <p className="mt-4 text-sm">
          Don't have an account? <a href="/signup" className="text-green-400">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
