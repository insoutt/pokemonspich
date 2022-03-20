import React, {Component} from "react";
import PokemonService, {Pokemon} from "../services/PokemonService";
import pencil from '../assets/icons/pencil.svg';
import trash from '../assets/icons/delete.svg';
import Icon from "../components/Icon";

interface Props {
    pokemons: Pokemon[];
    onDelete?: (pokemon: Pokemon) => void
    onEdit?: (pokemon: Pokemon) => void
}

interface State {
    isDeleting: boolean
}

class Table extends Component<Props, State> {
    state = {
        isDeleting: false,
    }

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
                            <button onClick={() => this.edit(pokemon)} className="btn btn-primary">
                                <Icon icon={pencil}/>
                            </button>
                            <button disabled={this.state.isDeleting} onClick={() => this.delete(pokemon)} className="btn btn-primary">
                                <Icon icon={trash}/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }

    private delete(pokemon: Pokemon) {
        this.setState({isDeleting: true});
        PokemonService.delete(pokemon.id)
            .then(pokemonResponse => {
                alert(`Pokemon ${pokemonResponse.name} eliminado correctamente`);
                if (typeof this.props.onDelete === 'function') {
                    this.props.onDelete(pokemon);
                }
            })
            .catch(() => {
                alert(`No ha podido eliminar el pokemon ${pokemon.name}, compruebe su conexión a Internet`);
            })
            .finally(() => {
                this.setState({isDeleting: false});
            })
    }

    private edit(pokemon: Pokemon) {
        if (typeof this.props.onEdit === 'function') {
            this.props.onEdit(pokemon);
        }
    }
}

export default Table;
