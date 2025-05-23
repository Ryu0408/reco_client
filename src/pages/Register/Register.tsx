import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { GENRES } from '../../constants/formOptions';
import { sendVerificationCode, verifyCode } from '../../api/user';
import './Register.css';

interface RegisterForm {
  user_email: string;
  user_password: string;
  user_password_check: string;
  user_name: string;
  user_age: string;
  user_gender: 'M' | 'F';
  genres: string[];
  keywords: string;
}

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  const [isVerified, setIsVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCodeInput, setVerificationCodeInput] = useState('');

  const [form, setForm] = useState<RegisterForm>({
    user_email: email,
    user_password: '',
    user_password_check: '',
    user_name: '',
    user_age: '',
    user_gender: 'M',
    genres: [],
    keywords: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenreToggle = (genre: string) => {
    const updated = form.genres.includes(genre)
      ? form.genres.filter((g) => g !== genre)
      : [...form.genres, genre];
    setForm({ ...form, genres: updated });
  };

  const handleSendVerificationCode = async () => {
    try {
      const result = await sendVerificationCode(form.user_email);
      if (result.success) {
        setCodeSent(true);
        alert('이메일로 인증코드를 전송했습니다.');
      } else {
        alert('인증코드 전송 실패');
      }
    } catch {
      alert('서버 오류: 인증코드 전송 실패');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const result = await verifyCode(form.user_email, verificationCodeInput);
      
      if (result.verified) {
        setIsVerified(true);
      }

      alert(result.message || result.reason || result.error || '결과를 불러오지 못했습니다.');

    } catch {
      alert('서버 오류: 인증코드 확인 실패');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }

    if (form.user_password !== form.user_password_check) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const payload = {
      user_email: form.user_email,
      user_password: form.user_password,
      user_name: form.user_name,
      user_age: parseInt(form.user_age),
      user_gender: form.user_gender,
      user_preferences: {
        genres: form.genres,
        keywords: form.keywords.split(',').map((k) => k.trim()),
      },
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    alert(result.message || result.error);
  };

  return (
    <div className="register-container">
      <AuthHeader />
      <form onSubmit={handleSubmit} className="register-form-box">
        <h2 className="register-form-title">회원가입</h2>

        <input
          className="register-input-field register-input-readonly"
          name="user_email"
          value={form.user_email}
          readOnly
        />

        {!isVerified && (
          <>
            <button type="button" className="register-submit-button" onClick={handleSendVerificationCode}>
              인증코드 전송
            </button>
            {codeSent && (
              <>
                <input
                  className="register-input-field"
                  placeholder="인증코드 입력"
                  value={verificationCodeInput}
                  onChange={(e) => setVerificationCodeInput(e.target.value)}
                />
                <button type="button" className="register-submit-button" onClick={handleVerifyCode}>
                  인증코드 확인
                </button>
              </>
            )}
          </>
        )}

        {isVerified && (
          <p className="register-verification-success">✅ 이메일 인증이 완료되었습니다.</p>
        )}

        <input
          className="register-input-field"
          name="user_password"
          type="password"
          placeholder="비밀번호"
          value={form.user_password}
          onChange={handleChange}
          required
        />

        <input
          className="register-input-field"
          name="user_password_check"
          type="password"
          placeholder="비밀번호 확인"
          value={form.user_password_check}
          onChange={handleChange}
          required
        />

        <input
          className="register-input-field"
          name="user_name"
          placeholder="이름"
          value={form.user_name}
          onChange={handleChange}
          required
        />

        <input
          className="register-input-field"
          name="user_age"
          type="number"
          placeholder="나이"
          value={form.user_age}
          onChange={handleChange}
          required
        />

        <div className="register-radio-group">
          <label className="register-radio-label">
            <input
              type="radio"
              name="user_gender"
              value="M"
              checked={form.user_gender === 'M'}
              onChange={handleChange}
            />
            남성
          </label>
          <label className="register-radio-label">
            <input
              type="radio"
              name="user_gender"
              value="F"
              checked={form.user_gender === 'F'}
              onChange={handleChange}
            />
            여성
          </label>
        </div>

        <div className="register-genre-select">
          {GENRES.map(({ label, value }) => (
            <label key={value} className="register-genre-item">
              <input
                type="checkbox"
                checked={form.genres.includes(value)}
                onChange={() => handleGenreToggle(value)}
              />
              {label}
            </label>
          ))}
        </div>

        <input
          className="register-input-field"
          name="keywords"
          placeholder="선호 키워드 (쉼표로 구분)"
          value={form.keywords}
          onChange={handleChange}
        />

        <button type="submit" className="register-submit-button">가입하기</button>
      </form>
    </div>
  );
};

export default Register;
