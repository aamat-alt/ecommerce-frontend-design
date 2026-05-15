import React, { useState } from 'react';
import API from '../api';

const Login = ({ setPage }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const { data } = await API.post(endpoint, form);
      if (!isRegister) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        setPage('home');
      } else {
        alert('Registered! Please login.');
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">
          {isRegister ? 'Create Account' : 'Sign In'}
        </h2>
        <p className="text-[#8B96A5] text-sm mb-6">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span className="text-primary cursor-pointer ml-1 font-medium" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>

        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

        {isRegister && (
          <div className="mb-4">
            <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-[#1C1C1C] mb-1 block">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Login;