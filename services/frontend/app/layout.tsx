import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

import {verifyJwtFromCookie } from "@/lib/auth";

// import { useState } from "react";

// import { HeaderProvider } from "@/context/HeaderProvider";

import { AuthProvider } from "../context/AuthContext";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import { Birthstone } from 'next/font/google';

const birthstone = Birthstone({
  subsets: ['latin'],
  weight: '400', // Birthstone n'a qu'un seul poids
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  // Pour le HeaderContext
  // const [connected, setConnected] = useState<boolean |undefined>(false);



  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <title>PomoPomo - Pomodoro online</title>
      </head>
      <body className="mx-auto" style={{backgroundColor: "#212121"}}>
        <ThemeProvider>
          {/* <HeaderProvider>
          <Header />
              <div className="flex items-center justify-center h-screen text-center p-10">
                {children}
              </div>


          </HeaderProvider>
 */}

                  <AuthProvider>
          <Header />
              {/* <div className="flex items-center justify-center h-screen text-center p-10"> */}
              <div className="container mx-auto ">
                <div className="min-h-screen flex items-center text-center p-10 justify-center">
                {children}

                </div>
              </div>

                  </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
