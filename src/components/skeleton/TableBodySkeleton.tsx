import { Skeleton } from "@mui/material";

export function TableBodySkeleton() {
  return (
    <>
      {
        [1, 2, 3, 4].map(item => (<Skeleton key={item} sx={{ my: 1 }} variant="rounded" width={'100%'} height={30} />))
      }
    </>
  )
}