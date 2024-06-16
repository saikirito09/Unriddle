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
import { v4 as uuidv4 } from "uuid"; // Import UUID
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setDialogType: React.Dispatch<
    React.SetStateAction<"signUp" | "logIn" | null>
  >;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  setDialogType,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImportClick = () => {
    navigate("/import");
  };

  const handleUnriddleClick = () => {
    navigate("/new");
  };

  const handleWriteClick = () => {
    if (!user) {
      setDialogType("logIn");
    } else {
      const newNotebookId = uuidv4(); // Generate a new UUID
      navigate(`/b/${newNotebookId}`); // Navigate to the new notebook URL
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 flex flex-col w-64 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      // Add hover class to change the opacity of the icon
      onMouseEnter={() => {
        document
          .getElementById("chevrons-left-icon")
          ?.classList.remove("opacity-0");
        document
          .getElementById("chevrons-left-icon")
          ?.classList.add("opacity-100");
      }}
      onMouseLeave={() => {
        document
          .getElementById("chevrons-left-icon")
          ?.classList.remove("opacity-100");
        document
          .getElementById("chevrons-left-icon")
          ?.classList.add("opacity-0");
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="text-2xl font-bold cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
          onClick={handleUnriddleClick}
        >
          unriddle
        </button>
        <Button variant="ghost" className="text-xl" onClick={toggleSidebar}>
          <ChevronsLeft
            id="chevrons-left-icon"
            className="h-6 w-6 text-gray-500 transition-opacity duration-300 opacity-0"
          />
        </Button>
      </div>
      <div className="flex items-center mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex-grow justify-start text-gray-500"
            >
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
          <li className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60 text-sm">
            The Mechanism of Nuclear Fission
          </li>
          <li className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60 text-sm">
            Possible Existence of a Neutron
          </li>
          <li className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60 text-sm">
            HST star-forming Trails
          </li>
          <li className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60 text-sm">
            The Network State
          </li>
          <li className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap w-60 text-sm">
            GDPR - Official Legal Text
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
