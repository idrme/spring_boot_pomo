"use client";


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter();

  const { user, logout } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md" style={{backgroundColor:"#181818"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-slate-900 dark:text-white">
            <Link href="/" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
              PomoPomo
            </Link>
          </div>

          {/* Liens desktop */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/timer" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
              Timer
            </Link>
            { !user && (
              <>
              <Link href="/login" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
                <Button variant="outline" size="sm">
                  Sign up
                </Button>
              </Link></>
            )}

            
            { user && (
              <>

            <Link href="/history" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
              History
            </Link>

            <Link href="/account" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white">
              My account ({user.name})
            </Link>

                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}


          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

        </div>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1" style={{backgroundColor:"#181818"}}>
          <Link href="/timer" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            Timer
          </Link>


            { !user && (
              <>
          <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            Login
          </Link>
          <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            Register
          </Link>

              
              </>
            )}


          { user && (
              <>

          <Link href="/history" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            History
          </Link>

          <Link href="/account" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            My account ({user.name})
          </Link>
                <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                  Logout ({user.name})
                </Button>
              </>
            )}

        </div>
      )}
    </header>
  )
}