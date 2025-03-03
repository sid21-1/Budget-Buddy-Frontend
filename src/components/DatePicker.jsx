import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const DatePicker = ({ transactionDate, setTransactionDate, label }) => {
  return (
    <div className="mb-1 flex items-center">
      <label className="  text-xs md:text-sm font-medium text-white">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className=" ml-4 justify-start text-start font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {transactionDate
              ? format(transactionDate, "yyyy-MM-dd")
              : "Select a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={transactionDate}
            onSelect={setTransactionDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
