"use client";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import { signOutAction } from '@/helpers';

export default function AuthButton() {
  const { data } = useSession();

  return (
    <Button variant='contained' onClick={async () => {
      await signOutAction()
    }}>
      {`Logout ${data?.user?.name}`}
    </Button>
  )
}
