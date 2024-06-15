import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeft, Pencil, Upload, Search } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setDialogType: React.Dispatch<
    React.SetStateAction<"signUp" | "logIn" | null>
  >;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  setDialogType,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    if (!isLoggedIn) {
      setDialogType("logIn");
    } else {
      // Handle the write action here if the user is logged in
    }
  };

  const handleImportClick = () => {
    navigate("/import");
  };

  const handleUnriddleClick = () => {
    navigate("/new");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="text-2xl font-bold cursor-pointer"
          onClick={handleUnriddleClick}
        >
          unriddle
        </button>
        <Button variant="ghost" className="text-xl" onClick={toggleSidebar}>
          <ChevronsLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex-grow">
              + New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 mx-4">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleWriteClick}>
                <Pencil className="mr-2 h-4 w-4" />
                Write
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleImportClick}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost">
          <Search className="h-8 w-8 text-gray-500 p-2" />
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
  );
};

export default Sidebar;
