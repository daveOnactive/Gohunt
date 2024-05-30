import { Box, Grid, Card, Typography } from "@mui/material"

type IProps = {
  items: {
  title: string;
  content: string;
  } []
}
export function Timeline({ items }: IProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: { sm: '900px' },
      mx: 'auto',
      position: 'relative',
      mt: { sm: 10 }
    }}>
      <Box width="100%">
        {
          items.map((item, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <Grid container key={item.title} sx={{
                  my: { sm: '3rem', xs: '1rem' }
                }}>
                  <Grid item sm={6}>
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                    }} />
                  </Grid>
                  <Grid item sm={6} sx={{
                    display: 'flex'
                  }}>
                    <Box
                      sx={{
                        width: { sm: '97px' },
                        height: { sm: '3px' },
                        backgroundColor: '#EB832E',
                        marginTop: 1.8,
                        display: { xs: 'none', sm: 'block' },
                        '&::after': {
                          content: "''",
                          position: 'relative',
                          top: '-100%',
                          backgroundColor: '#EB832E',
                          width: '10px',
                          height: '10px',
                          borderRadius: 100,
                          display: 'block',
                          zIndex: 2,
                          right: '5%'
                        }
                      }}
                    />
                    <Card
                      sx={{
                        py: { sm: 2.5, xs: 2 },
                        px: { sm: 1.8, xs: 1.3 },
                        textAlign: { sm: 'left' }
                      }}
                    >
                      <Typography variant="h6" mb={2} fontWeight="bold">{item.title}</Typography>

                      <Typography variant="body1">{item.content}</Typography>
                    </Card>
                  </Grid>
                </Grid>
              )
            };

            return (
              <Grid container key={item.title} sx={{
                my: { sm: '3rem' }
              }}>
                <Grid item sm={6} sx={{
                  display: 'flex'
                }}>
                  <Card
                    sx={{
                      py: { sm: 2.5, xs: 2 },
                      px: { sm: 1.8, xs: 1.3 },
                      textAlign: { sm: 'right' }
                    }}
                  >
                    <Typography variant="h6" mb={2} fontWeight="bold">{item.title}</Typography>

                    <Typography variant="body1">{item.content}</Typography>
                  </Card>
                  <Box
                    sx={{
                      width: { sm: '97px' },
                      height: { sm: '3px' },
                      backgroundColor: '#EC3363',
                      marginTop: 1.8,
                      display: { xs: 'none', sm: 'block' },
                      '&::after': {
                        content: "''",
                        position: 'relative',
                        left: '95%',
                        top: '-100%',
                        backgroundColor: '#EC3363',
                        width: '10px',
                        height: '10px',
                        borderRadius: 100,
                        display: 'block',
                        zIndex: 2
                      }
                    }}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                  }} />
                </Grid>
              </Grid>
            )
          })
        }
      </Box>
      <Box sx={{
        height: '800px',
        width: '2px',
        backgroundColor: '#1F719D',
        position: 'absolute',
        display: { xs: 'none', sm: 'block' },
        top: '-3%',
        '&::before': {
          content: "''",
          position: 'absolute',
          top: 0,
          width: '15px',
          height: '15px',
          borderRadius: 100,
          backgroundColor: '#1F719D',
          display: 'block',
          right: '-.4rem'
        },
        '&::after': {
          content: "''",
          position: 'absolute',
          bottom: 0,
          width: '15px',
          height: '15px',
          borderRadius: 100,
          backgroundColor: '#1F719D',
          display: 'block',
          right: '-.4rem'
        }
      }} />
    </Box>
  )
}