import React, { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";

const CommandMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="relative">
        <CommandInput placeholder="Type a command or search..." />
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          <CommandItem>GDPR - Official Legal Text</CommandItem>
          <CommandItem>The Mechanism of Nuclear Fission</CommandItem>
          <CommandItem>The Network State</CommandItem>
          <CommandItem>HST star-forming Trails</CommandItem>
          <CommandItem>Possible Existence of a Neutron</CommandItem>
          <CommandItem>Welcome!</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
