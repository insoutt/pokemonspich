import React, {Component} from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import PokemonService, {Pokemon} from "../services/PokemonService";
import Search from "../components/Search";
import Icon from "../components/Icon";
import plus from '../assets/icons/plus.svg';

interface Props {
}

interface State {
    pokemons: Pokemon[];
    pokemon?: Pokemon;
    formTitle: string;
    total: number;
    showForm: boolean;
    showTable: boolean;
}

class Index extends Component<Props, State> {

    pokemons: Pokemon[] = []

    constructor(props: Props) {
        super(props);

        this.state = {
            total: 0,
            pokemons: [],
            pokemon: undefined,
            formTitle: 'Nuevo Pokemon',
            showForm: false,
            showTable: true,
        }
    }

    componentDidMount() {
        this.getPokemons();
        this.getCount();
    }

    render() {
        return (<main className="container">
            {this.state.showTable && <h1 className="text-center font-pokemon title-pokemon">
                Pokemon
            </h1>}

            {this.state.showTable && <div className="flex justify-between mb-2">
                <Search onSearch={this.search.bind(this)}/>
                <div>
                    <button onClick={this.create.bind(this)} className="btn btn-icon btn-primary">
                        <Icon icon={plus}/> Nuevo
                    </button>
                </div>
            </div>}
            {this.state.showTable && <Table pokemons={this.state.pokemons}
                    total={this.state.total}
                    onDelete={this.onDelete.bind(this)}
                    onEdit={this.onEdit.bind(this)}/>}

            {this.state.showForm && <Form title={this.state.formTitle}
                  onCancel={this.onCancel.bind(this)}
                  pokemon={this.state.pokemon}
                  onSubmit={this.onCreate.bind(this)}/>}
        </main>);
    }

    getPokemons() {
        console.log('getpokemons')
        PokemonService.list().then(pokemons => {
            this.pokemons = pokemons;
            console.log(pokemons)
            this.setState({pokemons});
        })
    }

    getCount() {
        PokemonService.count().then(total => {
            this.setState({total})
        }).catch(() => {
            this.setState({total: 0})
            alert('No se ha podido obtener el total de pokemones, compruebe su conexión a Internet e intente nuevamente.');
        });
    }

    search(value: string) {
        const pokemons = this.pokemons.filter(pokemon => pokemon.name.toLocaleLowerCase().indexOf(value) !== -1);
        this.setState({pokemons});
    }

    showOnly(pokemon: Pokemon) {
        const pokemons = this.pokemons.filter(pokemonList => pokemonList.id === pokemon.id);
        this.setState({pokemons});
    }

    clearSearch() {
        this.search('');
    }

    onCancel() {
        this.clearSearch();
        this.showTable();
        this.closeForm()
    }

    onCreate(pokemon: Pokemon) {
        this.clearSearch();
        if (typeof this.state.pokemon === 'undefined') {
            this.getCount();
            this.pokemons.push(pokemon);
            this.setState({pokemons: this.pokemons})
            return;
        }

        this.pokemons.forEach(pokemonList => {
            if (pokemonList.id === pokemon.id) {
                pokemonList.name = pokemon.name;
                pokemonList.image = pokemon.image;
                pokemonList.type = pokemon.type;
                pokemonList.attack = pokemon.attack;
                pokemonList.defense = pokemon.defense;
                pokemonList.hp = pokemon.hp;
            }
        })

        this.setState({pokemons: this.pokemons})
        alert(`Pokemon ${pokemon.name} actualizado correctamente`);
    }

    onDelete(pokemon: Pokemon) {
        this.pokemons = this.pokemons.filter(pokemonList => pokemonList.id !== pokemon.id);
        this.setState({
            pokemons: this.pokemons,
        })
    }

    onEdit(pokemon: Pokemon) {
        this.showOnly(pokemon);
        this.showForm();
        this.setState({
            pokemon,
            formTitle: `Actualizar pokemon ${pokemon.name}`,
        })
    }

    create() {
        this.setState({pokemon: undefined});
        this.closeTable();
        this.showForm();
    }

    showForm() {
        this.setState({showForm: true})
    }

    closeForm() {
        this.setState({showForm: false})
    }

    showTable() {
        this.setState({showTable: true})
    }

    closeTable() {
        this.setState({showTable: false})
    }
}

export default Index;
