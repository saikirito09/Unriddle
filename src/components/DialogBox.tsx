import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

interface DialogBoxProps {
  dialogType: "signUp" | "logIn" | null;
  setDialogType: (type: "signUp" | "logIn" | null) => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ dialogType, setDialogType }) => {
  return (
    dialogType !== null && (
      <Dialog
        open={dialogType !== null}
        onOpenChange={() => setDialogType(null)}
      >
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
            <Button variant="secondary" className="flex items-center">
              <FcGoogle className="mr-2 h-6 w-6" />
              {dialogType === "signUp"
                ? "Sign Up with Google"
                : "Log In with Google"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DialogBox;
