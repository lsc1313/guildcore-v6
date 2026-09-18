GuildCore V6 - Cloudflare Worker + D1

휴대폰 배포용 GitHub 파일 3개:
1) worker.js
2) wrangler.jsonc
3) package.json

Cloudflare에서 GitHub 저장소를 Import 한 뒤,
Worker 설정 > Bindings > D1 database 에서
Variable name: DB
Database: guildcore-v6
로 연결합니다.

주의:
- D1 schema.sql은 이미 기존 D1에 적용한 상태라 이 저장소에는 포함하지 않아도 됩니다.
- BOT_API_KEY는 추후 봇 연결 단계에서 Secret으로 추가합니다.
