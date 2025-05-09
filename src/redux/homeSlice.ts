import {createSlice} from '@reduxjs/toolkit';
import {api} from './api';

interface HomeState {
  weatherCities: string[],
  colorScheme: string
}

const initialState: HomeState = {
  weatherCities: [],
  colorScheme: 'dark'
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    deleteCity: (state, action) => {
      let cityId = action.payload.cityId;
      state.weatherCities = state.weatherCities.filter(city => city?.id !== cityId)
    },
    toggleColorScheme: (state) => {
      if(state.colorScheme === 'dark') {
        state.colorScheme = 'light'
      } else {
        state.colorScheme = 'dark'
      }
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getWeatherDetails.matchFulfilled,
      (state, action) => {
        let cityId = action.payload.id;
        let cities = state.weatherCities;
        const cityExists = cities.some(city => city?.id === cityId);
        let timestamp = new Date().toISOString();
    
        if (!cityExists) {
          state.weatherCities = [{ ...action.payload, timestamp }, ...cities];
        } else {
          state.weatherCities = cities.map(city =>
            city.id === cityId ? { ...action.payload, timestamp } : city
          );
        }
    
        return state;
      }
    );        
  },
});

export const { deleteCity, toggleColorScheme } = homeSlice.actions;

export default homeSlice.reducer;
