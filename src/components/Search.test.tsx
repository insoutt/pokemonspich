import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from './Search';

test('Comprobar que funciona el prop onSearch', () => {
  const onSearch = jest.fn();
  render(<Search onSearch={onSearch}/>);

  const input = screen.getByPlaceholderText('Buscar...')

  fireEvent.change(input, {target: {value: 'Pikachu'}})
  // @ts-ignore
  expect(input.value).toBe('Pikachu')
  expect(onSearch).toHaveBeenCalledWith('pikachu');
});
