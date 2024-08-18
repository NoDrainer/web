declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
      POSTGRES_DB?: string;
      POSTGRES_PORT?: string;
      DB_ADDRESS?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_S3_PICTURES_BUCKET?: string;
      PORT?: string;
      GOOGLE_AUTOCOMPLETE_API_KEY?: string;
      GOOGLE_OAUTH_CLIENT_ID?: string;
      GOOGLE_OAUTH_CLIENT_SECRET?: string;
      GOOGLE_OAUTH_CALLBACK_URL?: string;
      VAPID_PRIVATE_KEY?: string;
      VAPID_PUBLIC_KEY?: string;
    }
  }
}

export {};
