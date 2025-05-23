export const checkEmailDuplicate = async (email: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email }),
      });
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('이메일 중복 체크 오류:', err);
      throw err;
    }
};

export const sendVerificationCode = async (email: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (err) {
    console.error('인증코드 전송 오류:', err);
    throw err;
  }
};

export const verifyCode = async (email: string, code: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    return await res.json();
  } catch (err) {
    console.error('인증코드 확인 오류:', err);
    throw err;
  }
};