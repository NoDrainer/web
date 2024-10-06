declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      CONTENTFUL_SPACE?: string;
      CONTENTFUL_ACCESS_TOKEN?: string;
    }
  }
}

export { };

