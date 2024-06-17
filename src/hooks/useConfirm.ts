import { ConfirmContext } from "@/providers";
import { useContext } from "react";

type IDialog = {
  title: string;
  onConfirm: () => void;
}

export function useConfirm() {

  const { 
    handleClickOpen,
    setTitle,
    setConfirm
  } = useContext(ConfirmContext);

  function showDialog({ title, onConfirm }: IDialog) {
    handleClickOpen();
    setTitle(title);
    setConfirm({ onConfirm });
  };

  return {
    showDialog
  }
}