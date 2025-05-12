import React, { useState } from 'react';
import './Login.css'; // 스타일은 아래 CSS 참고

const Login = () => {
  const [email, setEmail] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`이메일: ${email}로 시작합니다.`);
  };

  return (
    <div className="login-container">
      {/* 헤더 */}
      <header className="login-header">
        <div className="header-content">
          <img src="/src/assets/logo/ryuflix.svg" alt="RYUFLIX 로고" className="logo-image" />
          <button className="login-button">로그인</button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="login-main">
        <div className="login-box">
          <h2 className="title">AI 추천 기반 영화 검색 플랫폼</h2>
          <p className="subtitle">당신만을 위한 영화를 AI가 찾아드립니다.</p>
          <form onSubmit={handleStart} className="login-form">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <button type="submit" className="start-button">
              시작하기 <span className="arrow">▶</span>
            </button>
          </form>
          <div className="error-container">
            <p className={`error-text ${email === '' ? 'visible' : 'hidden'}`}>
              이메일 주소는 필수 항목입니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
