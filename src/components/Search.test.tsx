import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

const setup = () => {
  const utils = render(<Search />)
  const input = utils.getByPlaceholderText('Buscar...')
  return {
    input,
    ...utils,
  }
}


test('Comprobar evento onSearch', () => {
  const {input} = setup()
  fireEvent.change(input, {target: {value: 'Pikachu'}})
  // @ts-ignore
  expect(input.value).toBe('Pikachu')
});
