import React from "react";

interface SettingsPanelProps {
  isSettingsOpen: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isSettingsOpen }) => {
  return (
    <div
      className={`fixed top-14 right-0 h-full w-64 bg-white border-t border-l border-gray-200 p-4 transform transition-transform duration-300 flex flex-col ${isSettingsOpen ? "translate-x-0" : "translate-x-full"}`}
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
    </div>
  );
};

export default SettingsPanel;
