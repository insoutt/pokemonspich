import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';
import close from '../assets/icons/close.svg';

test('renders learn react link', () => {
  render(<Icon icon={close} alt="my test icon" />);
  const icon = screen.getAllByAltText('my test icon');
  expect(icon).toHaveLength(1)
  expect(icon[0]).toBeInTheDocument();
});
