import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders code available text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/code available /i);
  expect(linkElement).toBeInTheDocument();
});
