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

import { BadInputsRegister } from "@/components/BadInputsRegister";


import { useState } from "react";


import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import Link from "next/link"

export function Register() {

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [badInputs, setBadInputs] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(false);

  const router = useRouter();


    const { login } = useAuth();

  const sendForm = async  () => {
    const res = await fetch(`/api/auth/register`,
       {
          method: "POST",
          credentials : "include",
          headers:
          {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({username, password, email})
       }
    );
    if (res.ok)
    {
      const data = await res.json();
      login();
      router.push("/");
    }
    else {
      setBadInputs(true);
    }


  }


  

  return (
    <>
      {badInputs && (<div><BadInputsRegister /></div>)}
    <Card className="w-full max-w-sm">


      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* <div className="grid gap-2">
              <div className="flex items-center">
              </div>
              <Field orientation="horizontal">
                <div></div>
                <Checkbox id="terms-checkbox" name="terms-checkbox" />
                <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
              </Field>
            </div> */}
            <div className="grid gap-2">
              <div className="flex items-center">
              </div>
                <p>By clicking Submit, you agree to create an account and accept PomoPomo's <Link href="/rules">terms and conditions.</Link></p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={sendForm}>
          Submit
        </Button>

      </CardFooter>
    </Card>
    </>
  )
}
