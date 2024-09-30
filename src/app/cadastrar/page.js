'use client'

import Image from "next/image";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '/utils/firebaseAuth'; 
import { useRouter } from 'next/navigation';
import Link  from 'next/link'
import { AnalyticsInit } from "../../../utils/firebaseAuth";
import { logEvent } from "firebase/analytics";



export default function Cadastrar() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleCadastrar = async (e) => {

    e.preventDefault();   
    if(confirmPassword != password){
      alert('As senhas não coincidem!');
      return;
    }
    setLoading(true);
    setError(''); 

  try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userLog = userCredential.user;
      alert("Cadastro de usuário realizado com sucesso!");
      router.push('/');
      const analytics = await AnalyticsInit();
      if (analytics) {
        logEvent(analytics, 'sign_up', {
          method: 'email',
        });
        console.log("Evento de Cadastro de usuário registrado no Analytics");
      } else {
        console.warn("Analytics não está disponível.");
      }

    } catch (error) {
 
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está em uso.');
          break;
        case 'auth/invalid-email':
          setError('O endereço de e-mail está mal formatado.');
          break;
        case 'auth/weak-password':
          setError('A senha deve ter pelo menos 6 caracteres.');
          break;
        default:
          setError('Erro ao tentar cadastrar. Tente novamente mais tarde.');
          break;
      
    } 
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 -mt-12 items-center sm:items-center">
      <Image className="rounded-lg" priority src={"/icons/icon-192x192.png"} width={200} height={200} alt="Icone da Aplicação"/>
        <h1 className="text-blue-400">Cadastre-se</h1>
        <form className="flex flex-col space-y-4 w-80 " onSubmit={handleCadastrar}>
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
          <input
            className="border border-gray-300 p-2 rounded  focus:border-blue-500"
            placeholder="Confirme a senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">{loading ? "Carregando..." : "Cadastrar"}</button>
          
          {error && <p className="text-red-500">{error}</p>} 
    
        
        </form>
        <Link href="/" className="w-full">
        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Login</button>
        </Link>
      </main>
  
    </div>
    
  )}