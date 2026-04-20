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
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";




import { useState, useEffect } from "react";
import { BadInputsRegister } from "@/components/BadInputsRegister";
import { SentSuccessfully } from "@/components/SentSuccessfully";

export function EditAccount() {

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");


  const [badInputs, setBadInputs] = useState<boolean>(false);
  const [sentSuccessfully, setSentSuccessfully] = useState<boolean>(false);


  const router = useRouter();


    const { login } = useAuth();

  const sendForm = async  () => {
    const res = await fetch(`/api/private/edit`,
       {
          method: "PATCH",
          credentials : "include",
          headers:
          {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({username, password, email, new_password : newPassword})
       }
    );
    if (!res.ok) {
      setBadInputs(true);
      setSentSuccessfully(false);
    }
    else {
      setBadInputs(false);
      setSentSuccessfully(true);
    }
  }

  useEffect(() => {
    const getInfos = async  () => {
        const res = await fetch(`/api/private/connected`,
        {
            method: "GET",
            credentials : "include"
        });
        if (res.ok)
        {
        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
        }
        else {
            alert("Can't get infos of your profile");
        }
    }

    getInfos();
  }, []);


  

  return (
    <>
    {badInputs && (<div><BadInputsRegister /></div>)}
    {sentSuccessfully && (<div><SentSuccessfully /></div>)}
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Edit my account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email (required)</Label>
              <Input
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Old password (required)</Label>
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">New password <br />(leave blank if you don't want to change it)</Label>
              </div>
              <Input id="password" type="password" required onChange={(e) => setNewPassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={sendForm}>
          Modify
        </Button>

      </CardFooter>
    </Card>
    </>

  )
}
