'use client'

import { IoIosFingerPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/contextAuth";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '/utils/firebaseAuth'; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { AnalyticsInit } from "../../utils/firebaseAuth";



export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useAuth()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();   
    setLoading(true);
    setError(''); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userLog = userCredential.user;
      await setUser(userLog.email);
      const analytics = await AnalyticsInit();
      console.log(analytics)
      if (analytics) {
        logEvent(analytics, 'login', {
          metodo: 'email', 
        });
        console.log("Evento criado")
      } else {
        console.warn("Analytics não está disponível.");
      }

      alert("Login bem-sucedido!");
      router.push('/home');

    } catch (error) {
       setError('Email e/ou senha inválidos.');
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
      <Image className="rounded-lg" priority src={"/icons/icon-192x192.png"} width={200} height={200} alt="Icone da Aplicação"/>
        <h1 className="text-blue-400">Login</h1>
        <form className="flex flex-col space-y-4 w-80 " onSubmit={handleLogin}>
          <input
            className="border border-gray-300 p-2 rounded focus:border-blue-500"
            placeholder="Digite seu E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-2 rounded  focus:border-blue-500"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">{loading ? "Carregando..." : "Logar"}</button>
          {error && <p className="text-red-500">{error}</p>} 
          
        
        </form>
        <Link href={"/cadastrar"}><button disabled={loading} className="w-80 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Cadastrar</button></Link>
        <footer className="flex flex-wrap items-center justify-center">
        <p
          className="flex items-center gap-2"
        >
          <IoIosFingerPrint/>
          By Jefferson Santos - Pós-Graduação Infnet @2024
        </p>

      </footer>
      </main>

    </div>

    
    
  )}