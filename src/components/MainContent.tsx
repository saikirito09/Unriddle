import React from "react";
import { Pencil, Upload } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const MainContent: React.FC<{
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
}> = ({ isSidebarOpen, isSettingsOpen }) => {
  return (
    <div
      className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""} ${isSettingsOpen ? "mr-64" : ""} flex flex-col items-start`}
    >
      <div className="mx-auto max-w-3xl my-10">
        <div className="mb-8">
          <h1 className="text-4xl font-medium">Welcome to Unriddle</h1>
          <p className="text-xl text-gray-500">
            Import a document to understand its contents or start writing in a
            new note.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative flex flex-col items-start justify-between p-4 h-36 rounded-2xl border cursor-pointer transition-transform duration-150 bg-white hover:border-black">
            <Pencil className="h-5 w-5 absolute top-4 left-4" />
            <div className="mt-12">
              <h2 className="font-semibold text-lg">Write</h2>
              <p>Create a new note</p>
            </div>
          </div>
          <div className="relative flex flex-col items-start justify-between p-4 h-36 rounded-2xl border cursor-pointer transition-transform duration-150 bg-white hover:border-black">
            <Upload className="h-5 w-5 absolute top-4 left-4" />
            <div className="mt-12">
              <h2 className="font-semibold text-lg">Import</h2>
              <p>Add files into your library</p>
            </div>
          </div>
        </div>
        <div className="mb-8 w-full shadow-lg rounded-lg">
          <Command>
            <div className="relative">
              <CommandInput placeholder="Type a command or search..." />
              <div className="absolute right-4 top-4 text-gray-400 text-xs">
                Cmd + K
              </div>
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
          </Command>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
