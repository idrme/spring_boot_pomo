import { Button } from "@/components/ui/button"

import { Timer } from "@/components/Timer"
import { TimerTwo } from "@/components/TimerTwo"
import { verifyJwtFromCookie } from "@/lib/auth";

export default function Page() {
  return (
    <div className="w-full items-center flex justify-center">
        <TimerTwo />
    </div>
  )
}