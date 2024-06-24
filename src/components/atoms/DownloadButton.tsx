'use client'
import { useDownload } from "@/hooks";
import { IconButton, Backdrop, Typography, SxProps, Theme } from "@mui/material";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import CircularProgress from '@mui/material/CircularProgress';

type IProp = {
  downloadContent: React.ReactNode;
  filename: string;
  sx?: SxProps<Theme>;
}

export function DownloadButton({ downloadContent, filename, sx }: IProp) {

  const { handleDownload, isLoading } = useDownload();

  return (
    <>
      <IconButton
        sx={sx}
        size="large"
        onClick={() => handleDownload(downloadContent as any, filename)}
      >
        <DownloadRoundedIcon color='primary' sx={{
          fontSize: '3rem'
        }} />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
          <Typography ml={2}>Downloading Transaction...</Typography>
        </Backdrop>
      </IconButton>
    </>
  )
}