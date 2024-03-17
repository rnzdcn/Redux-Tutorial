import { Box, Card, CardContent, Typography } from '@mui/material'
import { numberWithCommas } from '../utils'

interface BasicCardProps {
  totalCitizen: number
  city: string
}

export default function BasicCard({ totalCitizen, city }: BasicCardProps) {
  return (
    <Card
      variant={'elevation'}
      raised={true}
      sx={{
        flexBasis: 'calc(50% - 1.875rem)',
        maxWidth: '345px',
        height: [ '140px', '200px', '260px' ],

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{ padding: [ '0.938rem', '1.875rem' ] }}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Typography
          noWrap
          variant="h4"
          sx={{ fontSize: [ '1.2rem', '2rem', '2.5rem' ] }}
        >
          {city}
        </Typography>

        <Box>
          <Typography
            noWrap
            variant="h2"
            fontWeight={'bolder'}
            sx={{ fontSize: [ '1.2rem', '3rem', '4rem' ] }}
          >
            {numberWithCommas(totalCitizen)}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontSize: [ '1rem', '1.25rem', '1.5rem' ] }}
          >
            Citizens
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
