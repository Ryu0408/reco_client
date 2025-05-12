import * as React from 'react';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

export const routes: { path: string; element: React.JSX.Element; title: string }[] = [
  {
    path: '/',
    element: <Landing />,
    title: 'RYUFLIX - AI 추천 영화 플랫폼',
  },
  {
    path: '/login',
    element: <Login />,
    title: 'RYUFLIX - 로그인',
  },
  {
    path: '/register',
    element: <Register />,
    title: 'RYUFLIX - 회원가입',
  },
];
