
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics"; 

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app;
let auth;
let analytics;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  analytics = getAnalytics(app, {
    config: {
      cookieDomain: 'auto',
      cookieFlags: 'max-age=7200;secure;samesite=none',
    },
})
}

export const AnalyticsInit = async () => {
  if (await isSupported()){
      analytics =  getAnalytics(app);
      console.log("Firebase Analytics foi inicializado com sucesso!");
  } else {
      console.warn("Firebase Analytics não é suportado nesse ambiente!");
  }
  return analytics;

}

export { app, auth};
