"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, RefObject, useImperativeHandle } from "react";


export type ImperativeHandlerFromDatePicker = { 
    reset : () => void 
}

type DatePickerProps = {
    id: string;
    name: string;
    defaultValue?: string | undefined;
    imperativeHandleRef?: RefObject<ImperativeHandlerFromDatePicker | null>
}

 const DatePicker = ({
   id,
   name,
   defaultValue,
   imperativeHandleRef,
 }: DatePickerProps) => {
   const [date, setDate] = useState<Date | undefined>(
     defaultValue ? new Date(defaultValue) : new Date()
   );
   const [open, setOpen] = useState<boolean>(false);

   const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

   useImperativeHandle(imperativeHandleRef, () => ({
     reset: () => {
       setDate(new Date());
     },
   }));

   const handleSelect = (selectedDate: Date | undefined) => {
     setDate(selectedDate);
     setOpen(false);
   };

   return (
     <Popover open={open} onOpenChange={setOpen}>
       <PopoverTrigger className="w-full" id={id} asChild>
         <Button
           variant={"outline"}
           className={"justify-start text-left font-normal"}
         >
           <CalendarIcon />
           {formattedStringDate}
           <input type={"hidden"} name={name} value={formattedStringDate} />
         </Button>
       </PopoverTrigger>
       <PopoverContent className="w-auto p-0" align="start">
         <Calendar
           mode="single"
           selected={date}
           onSelect={handleSelect}
           initialFocus
         />
       </PopoverContent>
     </Popover>
   );
 };


export {DatePicker}