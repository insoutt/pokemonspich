import React, {Component} from "react";
import PokemonService, {Pokemon} from "../services/PokemonService";
import pencil from '../assets/icons/pencil.svg';
import trash from '../assets/icons/delete.svg';
import Icon from "../components/Icon";
import styles from './Table.module.css';

interface Props {
    pokemons: Pokemon[];
    onDelete?: (pokemon: Pokemon) => void
    onEdit?: (pokemon: Pokemon) => void
    total: number
}

interface State {
    isDeleting: boolean
}

class Table extends Component<Props, State> {
    state = {
        isDeleting: false,
    }

    render() {
        return (<table className={styles.table}>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-right">Ataque</th>
                    <th className="text-right">Defensa</th>
                    <th className="text-right">Acciones</th>
                </tr>
            </thead>
            <tbody>
            {!this.props.pokemons.length && <tr className={styles.tr}>
                <td colSpan={6}>
                    <div className="text-center font-base">
                        No se ha encontrado pokemones para el término de búsqueda ingresado.
                    </div>
                </td>
            </tr>}
                {this.props.pokemons.map(pokemon => (
                    <tr className={styles.tr} key={pokemon.id}>
                        <td className="text-center">
                            <img className="shadow-png" src={pokemon.image} alt={pokemon.name}/>
                        </td>
                        <td>{pokemon.name}</td>
                        <td className="text-right">{pokemon.attack}</td>
                        <td className="text-right">{pokemon.defense}</td>
                        <td className="text-right">
                            <button aria-label="edit" onClick={() => this.edit(pokemon)} className="btn btn-circle btn-primary">
                                <Icon icon={pencil}/>
                            </button>
                            <button aria-label="delete" disabled={this.state.isDeleting} onClick={() => this.delete(pokemon)} className="btn btn-circle btn-primary">
                                <Icon icon={trash}/>
                            </button>
                        </td>
                    </tr>
                ))}
                {!!this.props.pokemons.length && <tr className={styles.trFooter}>
                    <td colSpan={6}>
                        <div className="text-center font-base">
                            Se muestran {this.props.pokemons.length} de {this.props.total} pokemones
                        </div>
                    </td>
                </tr>}

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
