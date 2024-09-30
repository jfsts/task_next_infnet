"use client";

import AuthGuard from '@/components/AuthGuard';
import Tarefas from '@/components/tarefas';
import Link from 'next/link';
import { useAuth } from '../../../contexts/contextAuth';



export default function Home() {
  const { logout } = useAuth()
  return (
    <AuthGuard>
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
       
          <div className="flex w-full flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className="w-full hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 justify-between items-center">
                <div className="space-x-4 justify-center items-center">
                  <h1
                    className="rounded-md bg-gray-900 px-3 py-2 ml-7  text-xl font-medium text-white"
                    aria-current="page"
                  >
                    Tasks
                  </h1>
                </div>
                <div className="space-x-4 justify-center items-center">
              
                  <Link
                    href='/cadastrar'
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cadastrar usuário
                  </Link>
                  <Link
                    href="/profile"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
      
          <Link
            href="/cadastrar"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Cadastrar Usuário
          </Link>
          <Link
            href="/profile"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Perfil
          </Link>
          <button
            onClick={logout}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Logout
          </button>
      
        </div>
      </div>
    </nav>
    <Tarefas />
    </AuthGuard>
  );
}
