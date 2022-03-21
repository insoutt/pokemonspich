import {render, fireEvent, screen} from '@testing-library/react';
import ValidationProvider from "./ValidationProvider";

describe('Test ValidationProvider', () => {
    it('Validar longitud mínima', () => {
        // Invalid
        expect(ValidationProvider.min('hola', 5)).toBe(false);

        // Valid
        expect(ValidationProvider.min('Elvis', 5)).toBe(true);
    })

    it('Validar longitud número', () => {
        // Invalid
        expect(ValidationProvider.number(-1)).toBe(false);
        expect(ValidationProvider.number(-100)).toBe(false);
        expect(ValidationProvider.number('Elvis')).toBe(false);

        // Valid
        expect(ValidationProvider.number(100)).toBe(true);
        expect(ValidationProvider.number(10)).toBe(true);
    })

    it('Validar longitud mínima', () => {
        // Invalid
        expect(ValidationProvider.image('localhost')).toBe(false);
        expect(ValidationProvider.image('file://folder/image.jpg')).toBe(false);
        expect(ValidationProvider.image('https://www.google.com')).toBe(false);

        // Valid
        expect(ValidationProvider.image('https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png')).toBe(true);
    })
})
