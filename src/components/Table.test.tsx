import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import Table from './Table';
import {Pokemon} from "../services/PokemonService";

const pokemons: Pokemon[] = [
  {
    "id": 6627,
    "name": "Buterfly",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
    "type": "water",
    "hp": 0,
    "attack": 77,
    "defense": 50,
    "idAuthor": 1,
    "created_at": "2022-03-14T07:37:59.155Z",
    "updated_at": "2022-03-18T18:20:24.520Z"
  },
  {
    "id": 6634,
    "name": "Yanma1",
    "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png",
    "type": "bug",
    "hp": 0,
    "attack": 56,
    "defense": 50,
    "idAuthor": 1,
    "created_at": "2022-03-14T16:07:52.971Z",
    "updated_at": "2022-03-14T16:07:52.971Z"
  },
];


test('Renderizar tabla de pokemones', () => {
  render(<Table pokemons={pokemons} total={pokemons.length} />)
  // @ts-ignore
  pokemons.forEach((pokemon) => {
    const row = screen.getByText(pokemon.name).closest("tr");

    // Contenido
    // @ts-ignore
    const utils = within(row);
    expect(utils.getByText(pokemon.attack)).toBeInTheDocument();
    expect(utils.getByText(pokemon.name)).toBeInTheDocument();
    expect(utils.getByText(pokemon.defense)).toBeInTheDocument();
    expect(utils.getByAltText(pokemon.name)).toBeInTheDocument();

    // Acciones
    expect(utils.getAllByLabelText('edit')[0]).toBeInTheDocument();
    expect(utils.getAllByLabelText('delete')[0]).toBeInTheDocument();

  });

  // Total
  expect(screen.getByText(`Se muestran ${pokemons.length} de ${pokemons.length} pokemones`)).toBeInTheDocument();
});
