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
  title: string; // Add title prop
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  toggleSettings,
  setDialogType,
  title, // Add title prop
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate("/upgrade");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="mr-2 text-xl"
          onClick={toggleSidebar}
        >
          <AlignJustify className="h-6 w-6" />
        </Button>
        <span className="text-lg font-bold">{title}</span>{" "}
        {/* Display the title */}
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
