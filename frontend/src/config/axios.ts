import axios from 'axios';

// Set base URL from environment (Vite) or fallback
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; // send cookies for auth/session

// Optionally configure XSRF settings if backend uses Spring Security defaults
// axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export default axios;