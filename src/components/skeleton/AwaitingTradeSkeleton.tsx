import { Box, Skeleton } from "@mui/material";

export function AwaitingTradeSkeleton() {
  return (
    <Box>
      <Skeleton variant="circular" 
        sx={{
          display: 'flex',
          m: '1rem auto',
          height: 80,
          width: 80,
        }} 
      />

      <Skeleton
        variant="text"
        sx={{
          my: 2,
          display: 'flex',
          m: '1rem auto',
          width: 150,
        }}
      />


      <Skeleton
        variant="text"
        sx={{
          my: 2,
          width: 200
        }}
      />

      <Skeleton
        variant="text"
        sx={{
          my: 2,
          width: 200
        }}
      />

      <Skeleton
        variant="text"
        sx={{
          my: 2,
          width: 200
        }}
      />

      <Skeleton
        variant="text"
        sx={{
          my: 2,
          width: 200
        }}
      />

      <Skeleton
        variant="text"
        sx={{
          my: 2,
          width: 200
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: 4
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            my: 2,
            height: 50,
            width: 50,
            mr: 2
          }}
        />

        <Skeleton
          variant="rounded"
          sx={{
            my: 2,
            width: 100,
            height: 50
          }}
        />
      </Box>

    </Box>
  )
}