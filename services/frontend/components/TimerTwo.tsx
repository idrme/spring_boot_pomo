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
import { useRef, useState, useEffect } from "react";

import { ButtonGroup } from "@/components/ui/button-group"


import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

import { Lobster } from 'next/font/google';
import { useAuth } from "@/context/AuthContext";

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400', // Birthstone n'a qu'un seul poids
});
export function TimerTwo() {


    const INITIAL_TIME = 25 * 60;

    const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    // const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); /// MODIFIE VOIR LANCIEN SI PROBLEME
    const intervalRef = useRef<NodeJS.Timeout | null>(null); /// MODIFIE VOIR LANCIEN SI PROBLEME
    const [nbPomo, setNbPomo] = useState<number>(4); // Contient le nombre de timers (25 et 5 compris)
    const [actualPomo, setActualPomo] = useState<number>(0); // Contient le nombre de timers (25 et 5 compris)
    const [finished, setFinished] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");
    const [id, setId] = useState<number>(0);

    const [progressBar, setProgressbar] = useState<number>(1);

  const { user, logout } = useAuth();


    

    const pauseRef = useRef<HTMLButtonElement>(null);
    const startRef = useRef<HTMLButtonElement>(null);
    const restartRef = useRef<HTMLButtonElement>(null);


      // const sonRef = useRef(new Audio("/sound.mp3")); // chemin vers ton fichier

    // Charge depuis le sessionStorage un objet {taskName, time, numberPomodoros} dans un useEffect pour le premier montage
      // Calcule le nombre de timer 25  + 5 minutes nécessaires : 1 h = 4, 2h = 8... et met le résultat dans un useState appelé nbPomo
      // Met aussi dans un useState le numero du timer actuel. Si pair alors c'est 25 minutes si c'est impair c'est 5 minutes


    // Chargement du sessionStorage()
    useEffect(() => {
      
      // Uniquement pour tests je dois l'impémenter dans /private
      // const obj = {
      //   nbPomo : 4,
      //   actualPomo : 1,
      //   finished : false,
      //   taskName : "Finir l'exercice 2 de mathématiques"
      // };
      // sessionStorage.setItem("actualTask", JSON.stringify(obj));

      if (sessionStorage.getItem("actualTask") != null)
      {
        // alert(`Loaded : ${sessionStorage.getItem("actualTask")}`)
        const stored = sessionStorage.getItem("actualTask");
        const objSessionStorage = stored ? JSON.parse(stored) : null;
        setFinished(objSessionStorage.finished);
        setTaskName(objSessionStorage.taskName);
        setNbPomo(objSessionStorage.nbPomo);
        setActualPomo(objSessionStorage.actualPomo);
        setId(objSessionStorage.id);
      }

      // Vérifie si je peux envoyer des notifications au navigateur
      if ("Notification" in window) {
        Notification.requestPermission();
      }
      }, []);

      // Envoie une notification au navigateur si appelée
      const notifier = () => {
      if (Notification.permission === "granted") {
        new Notification("PomoPomo", {
          body: "The countdown has reached 0."
        });
      }
    };





    // useEffect( () => {
    //     if (startRef.current)
    //         startRef.current.innerText = "aaaa";
    // }, []);




    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };




    useEffect(()=> {

      // sonRef.current.pause();
      // sonRef.current.currentTime = 0;
      // sonRef.current.play();
      notifier();

      // alert(nbPomo);
      if (actualPomo % 2 == 0)
        setTimeLeft(60 * 25);
      else 
        setTimeLeft(60 * 5);

      // Met a jour la progressbar
      setProgressbar((actualPomo / nbPomo) * 100);


      // Si la tache est finie (tous les timers sont terminés)
      if (nbPomo == actualPomo)
      {
        setFinished(true);

        // A FAIRE : requete si connecté 
        if (user)
        {






        const setFinishedApi = async () => {
            const res = await fetch(`/api/private/setFinishedTask?id=` + id,
          {
              method: "GET",
              credentials : "include"
          }
        );
        if (res.ok)
        {
          // alert("Task finished");
        }
        else {
          // alert("Error when setting task finished");
        }
      }
      setFinishedApi();



        }
        
      }

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            // alert("aaaaaaaa"); // appelée une seule fois
            setActualPomo((prev) => prev + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    }, [actualPomo]);

    const start = (): void => {

      setIsRunning(true);
          // Empêche de créer plusieurs intervalles
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            // alert("aaaaaaaa"); // appelée une seule fois
            setActualPomo((prev) => prev + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

// setIsRunning(true);


    };
    const pause = (): void => {
      setIsRunning(false);
      if (intervalRef.current)
      {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    const reset = (): void => {
        setFinished(false);
        setActualPomo(0);
        setTimeLeft(25 * 60);
    };


    const setToZero = (): void => {
        setTimeLeft(0);
    };



  return (



    <div className="">
        <div className={`font-bold text-7xl md:text-9xl font-mono mb-10 ${finished ? "hidden" : ""}`}>
          {formatTime(timeLeft)}
        </div>
        <div className={`font-bold text-5xl md:text-6xl font-mono mb-10 ${finished ? "" : "hidden"}`}>
          Finished
        </div>
        {/* <h1 className="text-xl md:text-3xl mb-4">Step 1 / 4</h1> */}

    <Field className="w-full max-w-sm mb-10">
      <FieldLabel htmlFor="progress-upload">
        <span>{actualPomo / 2} / {nbPomo / 2} pomodoros</span>
        <span className="ml-auto">Total duration : {nbPomo / 4} hour(s)</span>
      </FieldLabel>
      <Progress value={progressBar} id="progress-upload" />
    </Field>


    <Card className={`w-full max-w-sm ${finished ? "hidden" : ""}`}>
      <CardContent>


        <h2 className={`md:text-l  text-white font-bold`}>{taskName}</h2>



 







      </CardContent>
      <CardFooter className="flex-col gap-2">


   <div>



        <div className="flex gap-4 justify-center">
        
          <Button 
            ref={startRef}
            onClick={start}
            className={`py-6 px-10 ${isRunning ? "hidden" : ""} `}
          >
            Start
          </Button>

          <Button 
            onClick={setToZero}
            className={`py-6 px-10 ${isRunning ? "" : "hidden"}`}
          >
            Skip
          </Button>

          <ButtonGroup>
          <Button
            variant="outline"
            onClick={pause}
            className={`py-6 px-14 ${isRunning ? "" : "hidden"} `}
            // className="px-4 py-2 bg-yellow-500 text-white rounded-xl "
            ref={pauseRef}
          >
            Pause
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className={`py-6 px-2 ${isRunning ? "" : "hidden"} `}
          >
            Reset all
          </Button>
          </ButtonGroup>
        </div>

    </div>





      </CardFooter>
    </Card>




    </div>




  )
}
