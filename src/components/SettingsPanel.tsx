import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SettingsPanelProps {
  isSettingsOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isSettingsOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={`fixed top-14 right-0 h-full w-64 bg-white border-t border-l border-gray-200 p-4 transform transition-transform duration-300 ${
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
      {user && (
        <div className="mt-6">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-start"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
