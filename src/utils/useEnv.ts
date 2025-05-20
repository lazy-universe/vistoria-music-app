const isProd = process.env.NODE_ENV === 'production';

export const BACKEND_URL = isProd ? process.env.BACKEND_URL : `http://localhost:5000`;