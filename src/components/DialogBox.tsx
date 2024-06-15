import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";

interface DialogBoxProps {
  dialogType: "signUp" | "logIn" | null;
  setDialogType: React.Dispatch<
    React.SetStateAction<"signUp" | "logIn" | null>
  >;
}

const DialogBox: React.FC<DialogBoxProps> = ({ dialogType, setDialogType }) => {
  const { login } = useAuth();

  return (
    <Dialog open={dialogType !== null} onOpenChange={() => setDialogType(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {dialogType === "signUp" ? "Sign Up" : "Log In"}
          </DialogTitle>
          <DialogDescription>
            {dialogType === "signUp"
              ? "Sign up with your Google account."
              : "Log in with your Google account."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Button
            variant="secondary"
            className="flex items-center"
            onClick={login}
          >
            <FcGoogle className="mr-2 h-6 w-6" />
            {dialogType === "signUp"
              ? "Sign Up with Google"
              : "Log In with Google"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
