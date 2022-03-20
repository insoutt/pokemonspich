import React, {Component} from "react";

interface Props {
}

interface State {

}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    idAuthor: number;
    created_at: string;
    updated_at: string;
}

class Table extends Component<Props, State> {
    render() {
        return (<table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Ataque</th>
                    <th>Defensa</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ivysaur</td>
                    <td className="text-center">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png" alt="Pokemon"/>
                    </td>
                    <td>65</td>
                    <td>38</td>
                    <td>
                        <button>E</button>
                        <button>D</button>
                    </td>
                </tr>
            </tbody>
        </table>);
    }
}

export default Table;
