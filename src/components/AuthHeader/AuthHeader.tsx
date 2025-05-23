import './AuthHeader.css';

const AuthHeader = () => {

  return (
    <header className="auth-header">
    <div className="auth-header-content">
        <img src="/logo/ryuflix.svg" alt="RYUFLIX 로고" className="auth-logo-image" />
        <button className="auth-button">로그인</button>
    </div>
    </header>
  );
};

export default AuthHeader;
