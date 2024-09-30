import localFont from "next/font/local";
import "./globals.css";
import { TaskProvider } from "../../contexts/contextTasks";
import RegisterServiceWorker from "../../register-service-worker";
import { AuthProvider } from "../../contexts/contextAuth";
import AuthGuard from "@/components/AuthGuard";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Gerenciador de Tarefas",
  description: "Gerenciamento das principais tarefas",
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
        <head>
        <link rel="manifest" href="/manifest.json" />
    
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TaskProvider>
          <AuthProvider>
              {children}
              <RegisterServiceWorker />
          </AuthProvider>
        </TaskProvider>
       
      </body>
  
    </html>
    
  );
}
