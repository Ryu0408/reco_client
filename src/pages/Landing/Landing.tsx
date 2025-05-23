import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { checkEmailDuplicate } from '../../api/user';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const { exists } = await checkEmailDuplicate(email);
      if (exists) {
        navigate('/login', { state: { email } });
      } else {
        navigate('/register', { state: { email } });
      }
    } catch (err) {
      console.error('이메일 중복 체크 실패:', err);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };
  

  return (
    <div className="landing-container">
      <AuthHeader />
      <main className="landing-main">
        <div className="landing-box">
          <h2 className="landing-title">AI 추천 기반 영화 검색 플랫폼</h2>
          <p className="landing-subtitle">당신만을 위한 영화를 AI가 찾아드립니다.</p>
          <form onSubmit={handleStart} className="landing-form">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="landing-email-input"
              maxLength={200}
            />
            <button type="submit" className="landing-start-button">
              시작하기 <span className="landing-arrow">▶</span>
            </button>
          </form>
          <div className="landing-error-container">
            <p className={`landing-error-text ${email === '' ? 'visible' : 'hidden'}`}>
              이메일 주소는 필수 항목입니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
