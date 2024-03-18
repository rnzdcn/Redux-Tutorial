import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Country, State } from '../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store/store.ts'

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

  const location = useSelector((state: RootState) => state.countries.selectLocation)

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLocation = menuItems.find(item => item.name === event.target.value)
    if (type === 'country') {
      if (!handleOnCountryChange) return
      handleOnCountryChange(selectedLocation as Country)
    } else {
      if (!handleOnStateChange) return
      handleOnStateChange(selectedLocation as State)
    }
  }

  function selectValue() {
    if (type === 'country' && location.country) {
      return location.country.name
    } else if (type === 'state' && location.state) {
      return location.state.name
    } else {
      return ''
    }
  }

  return (
    <Box sx={{ minWidth: [ '100%', 240 ] }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{inputLabel}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectValue()}
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

