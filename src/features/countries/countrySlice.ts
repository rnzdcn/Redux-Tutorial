import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Country, State } from '../../common/types'

interface TotalCitizen {
  country: number
  state: number
}

interface SelectLocation {
  country: Country | null
  state: State | null
}

interface InitialState {
  countries: Array<Country>;
  selectLocation: SelectLocation
  totalCitizen: TotalCitizen
  loading: boolean;
  error: string | undefined;
}

const initialState: InitialState = {
  countries: [],
  selectLocation: {
    country: null,
    state: null,
  },
  totalCitizen: {
    state: 0,
    country: 0,
  },
  loading: false,
  error: '',
}

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_FAKE_SERVER_URL}/countriesArray`)
    return response.data as Array<Country>
  } catch (error) {
    throw error
  }
})

export const selectCountry = createAction<Country | null>('country/select')
export const selectState = createAction<State | null>('state/select')

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false
      state.countries = action.payload
      state.error = ''
    })
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false
      state.countries = []
      state.error = action.error.message
    })
    builder.addCase(selectCountry, (state, action) => {
      state.loading = false
      state.selectLocation.country = action.payload
      state.error = ''
      state.totalCitizen.country = action.payload
        ? action.payload.states.reduce((total, state) => {
          return total + state.cities.reduce((totalCities, city) => {
            return totalCities + city.population
          }, 0)
        }, 0)
        : 0
    })
    builder.addCase(selectState, (state, action) => {
      state.loading = false
      state.selectLocation.state = action.payload
      state.error = ''
      state.totalCitizen.state = action.payload
        ? action.payload.cities.reduce((totalCities, city) => {
          return totalCities + city.population
        }, 0) : 0
    })
  },
})


export default countrySlice.reducer
