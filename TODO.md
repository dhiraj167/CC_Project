# Notes App - Deployment Checklist

## Overview
Tracking deployment and testing steps for the Notes App.

## Steps Completed ✅
- [x] 1. Created TODO.md tracking progress.
- [x] 2. Updated frontend/src/Pages/Login.jsx: Added loading state, react-router-dom navigation (`useNavigate`), console.error for debugging.
- [x] 3. Updated frontend/src/api.js: Added response interceptor for error logging.
- [x] 4. Updated backend/server.js: Configured secure CORS for frontend origins.
- [x] 5. Created .env.example with environment variable guidance.

## Steps Remaining ⏳
- [ ] 6. **Deployment**: 
  | Set `VITE_API_URL=https://your-backend-url.com` in frontend env.
  | Backend: Ensure `JWT_SECRET` is set in env.
- [ ] 7. **Local Test**: 
  | Backend: `cd backend && npm install && npm start`
  | Frontend: `cd frontend && npm install && npm run dev` (uses /api proxy)
  | Test login/register → navigates to Dashboard.
- [ ] 8. **Prod Test**: Deploy, check browser Console/Network tab: API calls succeed, token sets, navigates to Dashboard.
- [ ] 9. **Verify**: No more "Operation failed" errors.

**Next**: Run tests, deploy with env vars, mark complete.

**Status**: Code fixes applied. Ready for testing/deployment.
