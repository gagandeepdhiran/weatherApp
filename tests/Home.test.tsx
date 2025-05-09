import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../src/screens/home';
import renderWithProviders from './utils/renderWithProviders';

describe('Home Screen', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the Home screen correctly', () => {
    const { getByTestId, getByText } = renderWithProviders(<Home />);

    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByTestId('city-input')).toBeTruthy();
    expect(getByTestId('get-details-button')).toBeTruthy();
    expect(getByText(/The Weather App/)).toBeTruthy();
  });

  it('toggles the theme using the switch', () => {
    const { getByTestId } = renderWithProviders(<Home />);

    const switchToggle = getByTestId('color-scheme-switch');
    fireEvent(switchToggle, 'valueChange', true); // Switch to dark mode
    fireEvent(switchToggle, 'valueChange', false); // Switch back to light mode
  });

  it('handles city input and submission', async () => {
    const mockResponse = {
      coord: { lon: 77.2167, lat: 28.6667 },
      weather: [{ id: 721, main: 'Haze', description: 'haze', icon: '50d' }],
      base: 'stations',
      main: {
        temp: 30,
        feels_like: 29,
        temp_min: 30,
        temp_max: 30,
        pressure: 1015,
        humidity: 45,
      },
      visibility: 3000,
      wind: { speed: 1.54, deg: 0 },
      clouds: { all: 40 },
      dt: 1625563200,
      sys: {
        type: 1,
        id: 9165,
        country: 'IN',
        sunrise: 1625532540,
        sunset: 1625583300,
      },
      timezone: 19800,
      id: 1273294,
      name: 'Delhi',
      cod: 200,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { getByTestId, getByText } = renderWithProviders(<Home />);

    const input = getByTestId('city-input');
    const button = getByTestId('get-details-button');

    fireEvent.changeText(input, 'Delhi');
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText(/Delhi, IN/)).toBeTruthy();
    });
  });
});
