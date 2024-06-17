import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AlignJustify, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PopoverDemo } from "./PopoverDemo";

interface NavbarProps {
  toggleSidebar: () => void;
  toggleSettings: () => void;
  setDialogType: React.Dispatch<
    React.SetStateAction<"signUp" | "logIn" | null>
  >;
  title: string;
  isSidebarOpen: boolean; // Add sidebar state prop
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  toggleSettings,
  setDialogType,
  title,
  isSidebarOpen, // Add sidebar state prop
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate("/upgrade");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center transition-all duration-300 ${isSidebarOpen ? "pl-64" : ""} font-inter`}
    >
      <div className="flex items-center">
        {!isSidebarOpen && ( // Conditionally render the hamburger menu
          <Button
            variant="ghost"
            className="mr-2 text-xl"
            onClick={toggleSidebar}
          >
            <AlignJustify className="h-6 w-6" />
          </Button>
        )}
        <span className="text-lg font-bold ml-2">{title}</span>
      </div>
      <div className="flex items-center">
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <PopoverDemo />
            <Button className="mr-2" onClick={handleUpgradeClick}>
              Upgrade
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => setDialogType("logIn")}
            >
              Log in
            </Button>
            <Button className="mr-2" onClick={() => setDialogType("signUp")}>
              Sign up
            </Button>
          </>
        )}
        <Button
          variant="secondary"
          className="p-2 text-black"
          onClick={toggleSettings}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
