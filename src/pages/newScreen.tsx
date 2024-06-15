import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandDialog,
} from "@/components/ui/command";
import { Progress } from "@/components/ui/progress";

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
    </CommandDialog>
  );
};

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-full" />;
}

const NewScreen: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center transition-all duration-300`}
      >
        <Button
          variant="ghost"
          className="mr-2 text-xl"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
        <div className="flex items-center">
          <Button variant="secondary" className="mr-2">
            Support
          </Button>
          <Button variant="secondary" className="mr-2">
            Log in
          </Button>
          <Button className="mr-2">Sign up</Button>
          <Button
            variant="secondary"
            className="p-2 text-black"
            onClick={toggleSettings}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 mt-14">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 z-30 flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <a href="/" className="text-2xl font-bold">
              unriddle
            </a>
            <Button variant="ghost" className="text-xl" onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </Button>
          </div>
          <div className="flex items-center mb-2">
            <Button variant="ghost" className="flex-grow">
              + New
            </Button>
            <Button variant="ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-gray-500 p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Button>
          </div>
          <div className="mt-6">
            <p className="font-semibold mb-2">Welcome!</p>
            <ul>
              <li className="mb-2">The Mechanism of Nuclear Fission</li>
              <li className="mb-2">Possible Existence of a Neutron</li>
              <li className="mb-2">HST star-forming Trails</li>
              <li className="mb-2">The Network State</li>
              <li className="mb-2">GDPR - Official Legal Text</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-6 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : ""
          } ${isSettingsOpen ? "mr-64" : ""} flex flex-col items-start`}
        >
          <div className="mx-auto max-w-3xl my-10">
            <div className="mb-8">
              <h1 className="text-4xl font-medium">Welcome to Unriddle</h1>
              <p className="text-xl text-gray-500">
                Import a document to understand its contents or start writing in
                a new note.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative flex flex-col items-start justify-between p-4 h-36 rounded-2xl border cursor-pointer transition-transform duration-150 bg-white hover:border-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500 absolute top-4 left-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
                <div className="mt-12">
                  <h2 className="font-semibold text-lg">Write</h2>
                  <p>Create a new note</p>
                </div>
              </div>
              <div className="relative flex flex-col items-start justify-between p-4 h-36 rounded-2xl border cursor-pointer transition-transform duration-150 bg-white hover:border-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500 absolute top-4 left-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
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
      </div>
      <div
        className={`fixed top-14 right-0 h-full w-64 bg-white border-t border-l border-gray-200 p-4 transform transition-transform duration-300 flex flex-col ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-sm text-gray-500">SETTINGS</h2>
        </div>
        <div className="mt-4">
          <p className="font-normal text-base text-black">Model</p>
          <ul>
            <li className="font-normal text-xs text-black">GPT-4</li>
          </ul>
        </div>
        {/* <div className="mt-6">
          <p className="font-normal text-sm text-black">Max Length</p>
          <div className="w-full">
            <ProgressDemo />
          </div>
        </div> */}
      </div>

      <CommandMenu />
    </div>
  );
};

export default NewScreen;
