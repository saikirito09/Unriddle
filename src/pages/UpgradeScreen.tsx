import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/DialogBox";

const UpgradeScreen: React.FC = () => {
  const [dialogType, setDialogType] = React.useState<"signUp" | "logIn" | null>(
    null,
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLaunchAppClick = () => {
    navigate("/new");
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col">
      <div className="flex justify-between items-center p-2 px-32 border-b border-gray-200">
        <h1 className="text-xl font-bold">unriddle</h1>
        <div className="flex items-center">
          {user && (
            <div className="flex items-center px-4 py-2 mr-4 text-secondary-foreground bg-secondary rounded-md">
              <div className="w-2.5 h-2.5 mt-1 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium">{user.displayName}</span>
            </div>
          )}
          <Button
            className="px-4 py-2 rounded-xl transform transition-transform duration-200 hover:scale-[1.03]"
            onClick={handleLaunchAppClick}
          >
            Launch App
          </Button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-semibold mb-6">
            This is an open-source project, <br />
            so everything is free!
          </p>
          <Button
            className="mt-4 px-16 py-2 rounded-xl transform transition-transform duration-200 hover:scale-[1.03]"
            onClick={handleLaunchAppClick}
          >
            Launch App
          </Button>
        </div>
      </div>
      <DialogBox dialogType={dialogType} setDialogType={setDialogType} />
    </div>
  );
};

export default UpgradeScreen;
