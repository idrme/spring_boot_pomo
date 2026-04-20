"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function RadioTime( {updateTime} : {updateTime : (value : string) => void}) {
  const [value, setValue] = useState("option1")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTime(e.target.value); // remonte la valeur au parent
  };

  return (

    <ul style={{backgroundColor:"#2a2a2a"}} className="items-center w-full text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-lg sm:flex">
        <li className="w-full border-b border-default sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input onChange={handleChange} id="horizontal-list-radio-license" type="radio" value="1" name="list-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"   />
                <label htmlFor="horizontal-list-radio-license" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">1 hour</label>
            </div>
        </li>
        <li className="w-full border-b border-default sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input onChange={handleChange} id="horizontal-list-radio-id" type="radio" value="2" name="list-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                <label htmlFor="horizontal-list-radio-id" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">2 hours</label>
            </div>
        </li>
        <li className="w-full border-b border-default sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input onChange={handleChange} id="horizontal-list-radio-military" type="radio" value="3" name="list-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                <label htmlFor="horizontal-list-radio-military" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">3 hours </label>
            </div>
        </li>
        <li className="w-full">
            <div className="flex items-center ps-3">
                <input onChange={handleChange} id="horizontal-list-radio-passport" type="radio" value="4" name="list-radio" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
                <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 select-none ms-2 text-sm font-medium text-heading">4 hours</label>
            </div>
        </li>
    </ul>
  )
}