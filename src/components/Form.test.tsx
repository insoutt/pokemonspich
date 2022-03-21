import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
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

const setup = () => {
  const onSubmit = jest.fn();
  const onCancel = jest.fn();
  const utils = render(<Form title="Crear pokemon" onSubmit={() => onSubmit} onCancel={onCancel}/>)
  const container = utils.container;

  const inputName = container.querySelector('#name');
  const inputImage = container.querySelector('#image');
  const inputAttack = container.querySelector('#attack');
  const inputDefense = container.querySelector('#defense');
  const inputHP = container.querySelector('#hp');
  const inputType = container.querySelector('#type');
  const btnSave = screen.getByLabelText('Guardar');
  const btnCancel = screen.getByLabelText('Cancelar');

  return {
    inputName,
    inputImage,
    inputAttack,
    inputDefense,
    inputHP,
    inputType,
    onCancel,
    onSubmit,
    btnSave,
    btnCancel,
    ...utils,
  }
}

describe('Probar componente <Form/>', () => {
  it('Renderiza formulario', () => {
    const {
      inputName,
      inputImage,
      inputAttack,
      inputDefense,
      inputHP,
      inputType,
      btnCancel,
      btnSave,
    } = setup()

    const title = screen.getByText('Crear pokemon');

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

  test('Comprueba que se llama el prop onCancel', () => {
    const {onCancel} = setup();
    const btnCancel = screen.getByLabelText('Cancelar');
    fireEvent.click(btnCancel);
    expect(onCancel).toHaveBeenCalled();
  });

  test('Comprobar validación input Nombre', () => {
    setup();
    const btnSave = screen.getByLabelText('Guardar');
    fireEvent.click(btnSave);
    expect(screen.getByText('El campo Nombre es obligatorio y debe tener al menos 3 caracteres.')).toBeInTheDocument();
  });

  test('Comprobar validación input Imagen', () => {
    const {inputName, btnSave} = setup()

    if (inputName) {
      fireEvent.change(inputName, {target: {value: 'Pikachu'}})
    }
    fireEvent.click(btnSave);
    expect(screen.getByText('La imagen debe ser una URL válida y de tipo png ó jpg.')).toBeInTheDocument();
  });

  test('Comprobar validación input Tipo', () => {
    const {inputName, inputImage, btnSave} = setup()

    if (inputName && inputImage) {
      fireEvent.change(inputName, {target: {value: 'Pikachu'}})
      fireEvent.change(inputImage, {target: {value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png'}})
    }

    fireEvent.click(btnSave);
    expect(screen.getByText('El campo Tipo no es válido, debe seleccionar un valor.')).toBeInTheDocument();
  });

  test('Comprobar validación input Ataque', () => {
    const {inputName, inputImage, inputType, btnSave} = setup()

    if (inputName && inputImage && inputType) {
      fireEvent.change(inputName, {target: {value: 'Pikachu'}})
      fireEvent.change(inputImage, {target: {value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png'}})
      fireEvent.change(inputType, {target: {value: 'water'}})
    }

    fireEvent.click(btnSave);
    expect(screen.getByText('El campo Ataque debe ser un número entre 0 y 100.')).toBeInTheDocument();
  });

  test('Comprobar validación input Defensa', () => {
    const {inputName, inputImage, inputType, inputAttack, btnSave} = setup()

    if (inputName && inputImage && inputType && inputAttack) {
      fireEvent.change(inputName, {target: {value: 'Pikachu'}})
      fireEvent.change(inputImage, {target: {value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png'}})
      fireEvent.change(inputType, {target: {value: 'water'}})
      fireEvent.change(inputAttack, {target: {value: '20'}})
    }

    fireEvent.click(btnSave);
    expect(screen.getByText('El campo Defensa debe ser un número entre 0 y 100.')).toBeInTheDocument();
  });

  test('Comprobar validación input HP', () => {
    const {inputName, inputImage, inputType, inputAttack, inputDefense, btnSave} = setup()

    if (inputName && inputImage && inputType && inputAttack && inputDefense) {
      fireEvent.change(inputName, {target: {value: 'Pikachu'}})
      fireEvent.change(inputImage, {target: {value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png'}})
      fireEvent.change(inputType, {target: {value: 'water'}})
      fireEvent.change(inputAttack, {target: {value: '20'}})
      fireEvent.change(inputDefense, {target: {value: '20'}})
    }

    fireEvent.click(btnSave);
    expect(screen.getByText('El campo HP debe ser un número entre 0 y 100.')).toBeInTheDocument();
  });
})
