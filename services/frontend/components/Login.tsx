"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { BadLogin } from "@/components/BadLogin";

export function Login() {



    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [badLogin, setBadLogin] = useState<boolean>(false);
  
    const router = useRouter();
  
  
      const { login } = useAuth();
  
    const sendForm = async  () => {
      const res = await fetch(`/api/auth/login`,
         {
            method: "POST",
            credentials : "include",
            headers:
            {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({username, password})
         }
      );
      if (res.ok)
      {
        // const data = await res.json();
        login();
        router.push("/");
      }
      else {
        setBadLogin(true);
      }
  
  
    }

  

  return (
    <>
          {badLogin && (<div><BadLogin /></div>)}
    
    <Card className="">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder=""
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={sendForm}>
          Login
        </Button>
        <Link href="/register" className="w-full" >
          Register
        </Link>
      </CardFooter>
    </Card>
    </>
  )
}
