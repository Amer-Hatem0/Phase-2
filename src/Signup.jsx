import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!, $role: String!, $universityId: String) {
    signUp(username: $username, password: $password, role: $role, universityId: $universityId) {
      user {
        id
        username
      }
    }
  }
`;

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '', role: '', universityId: '' });
  const [signUp] = useMutation(SIGN_UP);
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = isStudent ? 'student' : 'admin';
      await signUp({ variables: { ...form, role } });
      alert('✅ Account created successfully. Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-lg w-80 logind text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>

        <label htmlFor="signup-username" className="block text-left text-sm">Username</label>
        <input
          type="text"
          id="signup-username"
          placeholder="Choose a username"
          required
          className="w-full p-2 mt-1 mb-3 rounded bg-zinc-800 text-white"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <label htmlFor="signup-password" className="block text-left text-sm">Password</label>
        <input
          type="password"
          id="signup-password"
          placeholder="Create a password"
          required
          className="w-full p-2 mt-1 mb-3 rounded bg-zinc-800 text-white"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="student-checkbox"
            className="w-4 h-4 mr-2"
            checked={isStudent}
            onChange={e => {
              setIsStudent(e.target.checked);
              if (!e.target.checked) setForm({ ...form, universityId: '' });
            }}
          />
          <label htmlFor="student-checkbox" className="text-sm">I am a student</label>
        </div>

        {isStudent && (
          <div className="mb-3">
            <label htmlFor="student-id" className="block text-left text-sm">University ID</label>
            <input
              type="text"
              id="student-id"
              placeholder="Enter your university ID"
              required
              className="w-full p-2 mt-1 rounded bg-zinc-800 text-white"
              onChange={e => setForm({ ...form, universityId: e.target.value })}
            />
          </div>
        )}

        <button type="submit" className="w-full p-2 mt-4 bg-green-600 rounded hover:bg-green-500">Sign Up</button>

        <p className="mt-3 text-sm">
          Already have an account? <a href="/login" className="text-green-400 underline">Sign In</a>
        </p>
      </form>
    </div>
  );
}
