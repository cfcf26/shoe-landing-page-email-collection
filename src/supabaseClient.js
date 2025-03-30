import { createClient } from '@supabase/supabase-js';

// Supabase URL과 공개 API 키는 환경 변수로 설정하는 것이 좋습니다.
// 실제 배포시에는 .env 파일을 사용하세요.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// URL이 유효한지 확인
let supabase;
try {
  if (!supabaseUrl || supabaseUrl === 'your-supabase-url') {
    console.error('유효한 Supabase URL이 설정되지 않았습니다. .env 파일을 확인하세요.');
    // 개발 환경에서만 가짜 클라이언트를 생성
    supabase = {
      from: () => ({
        insert: () => Promise.resolve({ error: null }),
        select: () => Promise.resolve({ data: [], error: null })
      })
    };
  } else {
    // 유효한 URL이 있으면 실제 클라이언트 생성
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error('Supabase 클라이언트 생성 중 오류:', error);
  // 오류 발생 시 가짜 클라이언트 생성
  supabase = {
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
      select: () => Promise.resolve({ data: [], error: null })
    })
  };
}

export { supabase };