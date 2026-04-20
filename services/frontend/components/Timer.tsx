"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group"

export function Timer() {
    const INITIAL_TIME = 25 * 60;

    const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); /// MODIFIE VOIR LANCIEN SI PROBLEME

    const pauseRef = useRef<HTMLButtonElement>(null);
    const startRef = useRef<HTMLButtonElement>(null);
    const restartRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev: number) => {
                    if (prev <= 1) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            return 0;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // Nettoyage appelé lors du démontage ET si isRunning est modifié (apelle ensuite normalement le callback )
        return () => {
            if (intervalRef.current)
            {
                clearInterval(intervalRef.current);
            }
        }
    }, [isRunning]);

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

    const start = (): void => {setIsRunning(true);};
    const pause = (): void => setIsRunning(false);
    const reset = (): void => {
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME);
    };



  return (
    <div>

        <h1 className="text-3xl md:text-5xl mb-4">Step 1 / 4</h1>
        <div className="font-bold text-7xl md:text-9xl font-mono mb-0">
          {formatTime(timeLeft)}
        </div>
        <h2 className="md:text-2xl pb-10 text-gray-400">Faire toute la partie front en de mon projet</h2>


        <div className="flex gap-4 justify-center">
        
          <Button 
            ref={startRef}
            onClick={start}
            className={`py-6 px-10 ${isRunning ? "hidden" : ""} `}
          >
            Start
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
            className={`py-6 px-4 ${isRunning ? "" : "hidden"} `}
          >
            Reset
          </Button>
          </ButtonGroup>
        </div>

    </div>
  );

}