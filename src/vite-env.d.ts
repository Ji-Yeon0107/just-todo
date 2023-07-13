/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_WEATHER_SERVICE_KEY: string;
  }

  interface Dict<T> {
    [key: string]: T;
  }
}
