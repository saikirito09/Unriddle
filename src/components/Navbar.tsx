import React from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, Settings } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
  toggleSettings: () => void;
  setDialogType: (type: "signUp" | "logIn" | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleSidebar,
  toggleSettings,
  setDialogType,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center transition-all duration-300`}
    >
      <Button variant="ghost" className="mr-2 text-xl" onClick={toggleSidebar}>
        <AlignJustify className="h-6 w-6" />
      </Button>
      <div className="flex items-center">
        <Button variant="secondary" className="mr-2">
          Support
        </Button>
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
