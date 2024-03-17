import { Box, Container, Typography } from '@mui/material'
import BasicSelect from '../../common/components/Select.tsx'
import './app.css'
import BasicCard from '../../common/components/Card.tsx'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { fetchCountries, selectCountry, selectState } from '../../features/countries/countrySlice'
import { RootState } from '../store/store.ts'
import { Country, State } from '../../common/types'
import { numberWithCommas } from '../../common/utils'

function App() {
  const dispatch = useDispatch()

  const data = useSelector((state: RootState) => state.countries)

  const location = useSelector((state: RootState) => state.countries.selectLocation)

  const totalCitizen = useSelector((state: RootState) => state.countries.totalCitizen)

  React.useEffect(() => {
    // @ts-ignore
    dispatch(fetchCountries())
  }, [])

  const handleCountryChange = (country: Country | null) => {
    dispatch(selectCountry(country))

    dispatch(selectState(null))
  }

  const handleStateChange = (state: State | null) => {
    dispatch(selectState(state))
  }

  return (
    <Box className={'main'}>
      <Container
        maxWidth={'xl'}
        sx={{
          paddingTop: '3.75rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: [ '1.875rem', '2rem', '3.75rem' ],
        }}
      >
        <Box display={'flex'} gap={'0.938rem'}
             sx={{
               width: 'inherit',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               flexDirection: [ 'column', 'row' ],
             }}
        >
          <BasicSelect
            type={'country'}
            menuItems={data.countries}
            inputLabel={'Countries'}
            handleOnCountryChange={handleCountryChange}
          />
          <BasicSelect
            type={'state'}
            menuItems={location.country ? location.country.states : []}
            inputLabel={'States'}
            handleOnStateChange={handleStateChange}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontSize: [ '1.2rem', '1.5rem', '2rem' ] }}
        >
          Total Citizens: {
          location.country && location.state ? numberWithCommas(totalCitizen.state) :
            numberWithCommas(totalCitizen.country)}
        </Typography>
      </Container>

      <Container
        maxWidth={'xl'}
        sx={{ paddingBlock: [ '0.938rem', '1.875rem', '2rem' ] }}
      >
        <Typography variant="h5" mb={2} sx={{ fontSize: [ '1.2rem', '1.5rem' ] }}>Cities:</Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1.875rem',
          }}
        >

          {
            location.state === null
              ?
              <Typography variant="h5" sx={{ fontSize: [ '0.938rem' ], marginBottom: '0.938rem', textAlign: 'center' }}>Please
                select a country and state to view the data. No data is available until both a country and state are
                selected.</Typography>
              : Array.from(location.state.cities, (city, key) => (
                <BasicCard key={key} city={city.name} totalCitizen={city.population} />
              ))
          }

        </Box>
      </Container>
    </Box>
  )
}

export default App
