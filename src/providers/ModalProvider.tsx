'use client'
import { createContext, forwardRef, PropsWithChildren, useState } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


type IModalContext = {
  handleOpen: () => void;
  setModalContent: any;
  handleClose: () => void;
}

export const ModalContext = createContext<Partial<IModalContext>>({});

export function ModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modelContent, setModalContent] = useState<React.ReactNode | ''>(<></>)

  return (
    <ModalContext.Provider
      value={{
        handleOpen,
        setModalContent,
        handleClose
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          '& .MuiPaper-root': {
            width: { sm: '40% !important', xs: '100% !important' },
            padding: { sm: 3, xs: 2},
            height: 'fit-content'
          }
        }}
      >
        {modelContent}
      </Dialog>
      {children}
    </ModalContext.Provider>
  );
}
