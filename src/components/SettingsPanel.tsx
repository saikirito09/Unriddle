import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SettingsPanelProps {
  isSettingsOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isSettingsOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={`fixed top-13 right-0 h-full w-64 bg-white border-t border-l border-gray-200 p-4 transform transition-transform duration-300 ${
        isSettingsOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-sm text-gray-500 ml-2">SETTINGS</h2>
      </div>
      {user && (
        <div className="mt-4">
          <p className="font-medium text-base text-gray-500 mb-2 ml-2">
            Account
          </p>
          <p className="text-sm text-black ml-2">{user.displayName}</p>
          <p className="text-sm text-black mb-2 ml-2">{user.email}</p>
          <div
            className="w-full flex items-center justify-start p-2 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Sign out</span>
          </div>
        </div>
      )}
      <div className="mt-4 ml-2">
        <p className="font-medium text-base text-gray-500 mb-2">Model</p>
        <ul>
          <li className="font-normal text-xs text-black">GPT-4</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPanel;
