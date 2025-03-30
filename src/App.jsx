import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date() }]);
      
      if (error) throw error;
      
      toast.success('성공적으로 등록되었습니다!');
      setEmail('');
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error inserting email:', error);
      if (error.code === '23505') {
        toast.info('이미 등록된 이메일입니다. 감사합니다!');
        setIsSubscribed(true);
      } else {
        toast.error('오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-primary">특별한 신발 컬렉션</span>
            <span className="block mt-2">곧 출시됩니다</span>
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            가장 먼저 제품 출시 소식과 특별 프로모션을 받아보세요. 지금 이메일을 남기시면 출시일에 10% 할인 쿠폰을 보내드립니다.
          </p>
        </header>

        <div className="max-w-3xl p-8 mx-auto mt-12 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          {isSubscribed ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">감사합니다!</h2>
              <p className="mt-2 text-gray-600">
                이메일이 성공적으로 등록되었습니다. 출시 소식을 가장 먼저 알려드리겠습니다.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
                지금 등록하고 출시 소식을 받아보세요
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    이메일 주소
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? '제출 중...' : '등록하기'}
                </button>
              </form>
              <p className="mt-4 text-xs text-center text-gray-500">
                이메일은 제품 출시 정보 및 프로모션 정보 발송 목적으로만 사용됩니다.
                언제든지 구독을 취소할 수 있습니다.
              </p>
            </>
          )}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">기대해 주세요!</h2>
          <p className="mt-4 text-lg text-gray-600">
            최고의 소재와 혁신적인 디자인으로 제작된<br />특별한 신발 컬렉션이 곧 출시됩니다.
          </p>
          <div className="flex flex-col items-center justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="px-6 py-4 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-primary">최상의 품질</h3>
              <p className="mt-1 text-gray-600">최고급 소재만을 사용</p>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-primary">세련된 디자인</h3>
              <p className="mt-1 text-gray-600">모던하고 스타일리시한 디자인</p>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-primary">편안한 착용감</h3>
              <p className="mt-1 text-gray-600">하루 종일 편안한 착용감</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-6 mt-16 text-center text-gray-600 bg-gray-100">
        <p>© 2023 신발 브랜드. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}

export default App;