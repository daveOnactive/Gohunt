import { Skeleton } from "@mui/material";

export function DashboardCardSkeleton() {
  return (
    <>
      {
        [1,2,3, 4].map(item => (<Skeleton key={item} variant="rounded" width={'100%'} height={130} />))
      }
    </>
  )
}