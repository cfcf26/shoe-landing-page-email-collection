# 신발 판매 랜딩 페이지

신발 판매를 위한 이메일 수집 랜딩 페이지입니다. Supabase를 사용하여 이메일을 저장하고, Netlify로 배포합니다.

## 기능

- 반응형 디자인
- 이메일 폼 수집
- Supabase 데이터베이스 저장
- 사용자 알림 (성공, 오류 등)

## 설치 및 실행

1. 저장소 클론
```
git clone <repository-url>
cd shoe-landing-page
```

2. 의존성 설치
```
npm install
```

3. Supabase 프로젝트 설정
   - [Supabase](https://supabase.com)에서 새 프로젝트 생성
   - `subscribers` 테이블 생성 (필수 컬럼: `id`, `email`, `subscribed_at`)
   - `.env` 파일에 Supabase URL과 API 키 설정

4. 개발 서버 실행
```
npm run dev
```

5. 빌드
```
npm run build
```

## Supabase 설정

Supabase에서 다음 SQL을 실행하여 subscribers 테이블을 생성하세요:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Netlify 배포

1. Netlify에 GitHub 저장소 연결
2. 환경 변수 설정:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 라이센스

MIT