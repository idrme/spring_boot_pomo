"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "./ui/button"
import { RadioTime } from "@/components/RadioTime"
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function AddTask() {
      const router = useRouter();



      const { user, logout } = useAuth();
    

    const [taskName, setTaskName] = useState<string>("Default");
    const [time, setTime] = useState<string>("1");

    const handleSubmit = () => {







      const obj = {
        nbPomo : Number(time) * 4,
        actualPomo : 0,
        finished : false,
        taskName : taskName
      };

      // A faire : stocker la tache en base de données UNIQUEMENT SI CONNECTE
      if (user)
      {
        const sendForm = async  () => {
        const res = await fetch(`/api/private/createTask`,
          {
              method: "POST",
              credentials : "include",
              headers:
              {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({title : taskName, completed : false, time : Number(time) * 4})
          }
        );
        if (res.ok)
        {
          // login();
          // router.push("/");

          // Ajoute l'id de la tache au sessionStorage
          const json_received = await res.json();
          const new_obj = {...obj, id : json_received.id};
          // alert(JSON.stringify(new_obj));

          sessionStorage.setItem("actualTask", JSON.stringify(new_obj));
          router.push("/timer");

        }
        else {

        }

      }
      sendForm();
    } else {
        sessionStorage.setItem("actualTask", JSON.stringify(obj));
        router.push("/timer");

    }






  }


      // sessionStorage.setItem("actualTask", JSON.stringify(obj));
      // router.push("/");
    



  return (
    <FieldSet className="w-full max-w-xl ">
      <FieldGroup>
        <Field>
            <div className="flex justify-center mb-10">
                {/* <img style={{width:"128px"}} src="https://cdn-icons-png.freepik.com/512/7510/7510214.png" /> */}

            </div>
            <h1 className="text-5xl md:text-6xl font-bold ">PomoPomo</h1>
            <h2 className="mb-10 text-gray-400">Work in 25-minute increments</h2>
            {/* <p className="pb-10">(plus d'infos)</p> */}
            

            <h2 className="text-xl ">Describe your task and its duration</h2>
          {/* <FieldLabel htmlFor="feedback">Feedback</FieldLabel> */}
          <Textarea
            className="w-100 mb-5"
            id="feedback"
            placeholder="Revising for my math exam (optional)"
            rows={1}
            onChange={(e) => setTaskName(e.target.value)}
          />

            <RadioTime updateTime={setTime}/>

          <Button onClick={handleSubmit} className="py-6 mt-4 text-xl uppercase">Start the timer</Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
