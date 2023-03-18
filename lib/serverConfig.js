const isDEv = true;
const dev_url = "http://localhost:5000";
const client_dev_url = "http://localhost:3000";
export const SERVER_URL_$ = isDEv
  ? dev_url
  : "https://helper-cffl.onrender.com";
export const BASE_URL = isDEv
  ? client_dev_url
  : "https://hackertune.vercel.app";
