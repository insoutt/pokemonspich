import React, {Component} from "react";
import {Pokemon} from "../services/PokemonService";
import pencil from '../assets/icons/pencil.svg';
import trash from '../assets/icons/delete.svg';
import Icon from "../components/Icon";

interface Props {
    pokemons: Pokemon[];
}

interface State {

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
            {!this.props.pokemons.length && <tr>
                <td colSpan={6}>
                    <div className="text-center">
                        No existen registros de pokemones por el momento.
                    </div>
                </td>
            </tr>}
                {this.props.pokemons.map(pokemon => (
                    <tr key={pokemon.id}>
                        <td>{pokemon.name}</td>
                        <td className="text-center">
                            <img src={pokemon.image} alt={pokemon.name}/>
                        </td>
                        <td className="text-right">{pokemon.attack}</td>
                        <td className="text-right">{pokemon.defense}</td>
                        <td className="text-center">
                            <button className="btn btn-primary">
                                <Icon icon={pencil}/>
                            </button>
                            <button className="btn btn-primary">
                                <Icon icon={trash}/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }
}

export default Table;
