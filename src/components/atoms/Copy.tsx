'use client'
import { Tooltip, IconButton } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

type IProps = {
  value: string;
  name: string;
}
export function Copy({ value, name }: PropsWithChildren<IProps>) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  function handleCopy() {
    setOpen(true);
    navigator.clipboard.writeText(value || '');

    setTimeout(() => setOpen(false), 2000);
  }

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      onClose={handleTooltipClose}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={`${name} Copied!`}
    >
      <IconButton onClick={handleCopy}>
        <ContentCopyOutlinedIcon sx={{ color: 'white' }} />
      </IconButton>
    </Tooltip>
  )
}