export const checkEmailDuplicate = async (email: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email }),
      });
  
      const data = await res.json();
      return data; // 예: { exists: true } 또는 { exists: false }
    } catch (err) {
      console.error('이메일 중복 체크 오류:', err);
      throw err;
    }
};