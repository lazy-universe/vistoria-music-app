// const isProd = process.env.NODE_ENV === 'production';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? (()=>{
    throw  new Error("VITE_BACKEND_URL not set in enviornment variable")
})();