"use client"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { createContext, PropsWithChildren, useState } from "react";

export const ConfirmContext = createContext<any>({});

export function ConfirmProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [confirm, setConfirm] = useState({
    onConfirm: () => null
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    confirm.onConfirm();
  }


  return (
    <ConfirmContext.Provider
      value={{
        open,
        handleClickOpen,
        handleClose,
        setTitle,
        setConfirm
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            width: '30% !important'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" color='error' onClick={handleClose}>Disagree</Button>
          <Button variant="contained" color='success' onClick={handleConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </ConfirmContext.Provider>
  );
};

