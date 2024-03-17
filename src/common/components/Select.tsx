import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Country, State } from '../types'

interface BasicSelectProps {
  type: string
  menuItems: Array<Country> | Array<State>
  inputLabel: string
  handleOnCountryChange?: (value: Country | null) => void
  handleOnStateChange?: (value: State | null) => void
}

export default function BasicSelect(
  {
    type,
    menuItems,
    inputLabel,
    handleOnCountryChange,
    handleOnStateChange,
  }: BasicSelectProps) {

  const [ country, setCountry ] = React.useState<Country | null>(null)
  const [ state, setState ] = React.useState<State | null>(null)

  React.useEffect(() => {
    if (type === 'country') {
      if (!handleOnCountryChange) return
      handleOnCountryChange(country)
    } else {
      if (!handleOnStateChange) return
      handleOnStateChange(state)
    }

  }, [ country, state, type ])

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLocation = menuItems.find(item => item.name === event.target.value)

    if (type === 'country') {
      setCountry(selectedLocation as Country | null)
    } else {
      setState(selectedLocation as State | null)
    }
  }

  return (
    <Box sx={{ minWidth: [ '100%', 240 ] }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{inputLabel}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={(type === 'country' && country) ? country.name : state ? state.name : ''}
          label="selectedLocation"
          onChange={handleChange}
        >
          {
            menuItems.map((item, key) =>
              <MenuItem value={item.name} key={key}>{item.name}</MenuItem>,
            )
          }
        </Select>
      </FormControl>
    </Box>
  )
}

