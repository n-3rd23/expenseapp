declare global {
  namespace NodeJs {
    interface ProcessEnv {
      [key: string]: string;
      DATABASE_URL: string;
      PORT: number;
    }
  }
}
export {};
