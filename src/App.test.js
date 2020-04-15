import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import apiReducer from './store/apiDataSlice';

const store = configureStore({
  reducer: apiReducer
});

test('renders code available text', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/code available /i);
  expect(linkElement).toBeInTheDocument();
});
