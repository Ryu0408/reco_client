import React, { useState } from 'react';
import { type FormData } from '../../types/FormData';

const Register = () => {

  const [form, setForm] = useState<FormData>({
    user_email: '',
    user_password: '',
    user_name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: FormData = {
      ...form,
      user_age: 30,
      user_gender: 'M',
      user_preferences: {
        genres: ['sci-fi', 'action'],
      },
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log(result)
    alert(result.message || result.error);
  };

  return (
    <form onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-center">회원가입</h2>
      <input name="user_email"
        placeholder="이메일"
        className="w-full px-3 py-2 border rounded"
        onChange={handleChange}
      />
      <input name="user_password"
        type="password"
        placeholder="비밀번호"
        className="w-full px-3 py-2 border rounded"
        onChange={handleChange}
      />
      <input name="user_name"
        placeholder="이름"
        className="w-full px-3 py-2 border rounded"
        onChange={handleChange}
      />
      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        가입하기
      </button>
    </form>
  );
};

export default Register;