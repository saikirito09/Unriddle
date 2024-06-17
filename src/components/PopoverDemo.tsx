import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const PopoverDemo: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="mr-2 h-7 text-sm">
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Textarea
              id="feedback"
              placeholder="How can we improve?"
              className="h-32 resize-none border-none focus:outline-none focus:border-none focus:ring-0"
            />
            <div className="flex justify-between gap-4 mt-4">
              <Button variant="secondary" className="rounded-xl h-7 text-xs">
                Cancel
              </Button>
              <Button className="rounded-xl h-7 text-xs">Submit</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
