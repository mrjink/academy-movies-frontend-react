import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Movie link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Movie/i);
  expect(linkElement).toBeInTheDocument();
});
