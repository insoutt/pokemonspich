import React from 'react';
import {render, fireEvent, screen, within, act} from '@testing-library/react';
import Form from './Form';
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


describe('Probar componente <Form/>', () => {
  it('Renderiza formulario', () => {
    const component = render(<Form title="Crear pokemon" onSubmit={() => {}}/>)

    // title
    const title = screen.getByText('Crear pokemon');

    // inputs
    const inputName = component.container.querySelector('#name');
    const inputImage = component.container.querySelector('#image');
    const inputAttack = component.container.querySelector('#attack');
    const inputDefense = component.container.querySelector('#defense');
    const inputHP = component.container.querySelector('#hp');
    const inputType = component.container.querySelector('#type');

    // buttons
    const btnSave = screen.getByLabelText('Guardar');
    const btnCancel = screen.getByLabelText('Cancelar');

    expect(title).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputImage).toBeInTheDocument();
    expect(inputAttack).toBeInTheDocument();
    expect(inputDefense).toBeInTheDocument();
    expect(inputHP).toBeInTheDocument();
    expect(inputType).toBeInTheDocument();
    expect(btnSave).toBeInTheDocument();
    expect(btnCancel).toBeInTheDocument();
  });

})
