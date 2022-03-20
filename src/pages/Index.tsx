import React, {Component} from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import PokemonService, {Pokemon} from "../services/PokemonService";
import Search from "../components/Search";

interface Props {
}

interface State {
    pokemons: Pokemon[];
    pokemon?: Pokemon;
    formTitle: string;
}

class Index extends Component<Props, State> {

    pokemons: Pokemon[] = []

    constructor(props: Props) {
        super(props);

        this.state = {
            pokemons: [],
            pokemon: undefined,
            formTitle: 'Nuevo Pokemon',
        }
    }

    componentDidMount() {
        this.getPokemons();
    }

    render() {
        return (<main>
            <h1>
                Listado de Pokemon
            </h1>

            <div className="flex justify-between">
                <Search onSearch={this.search.bind(this)}/>
                <div>
                    <button>Nuevo</button>
                </div>
            </div>
            <Table pokemons={this.state.pokemons}
                   onDelete={this.onDelete.bind(this)}
                   onEdit={this.onEdit.bind(this)}/>

            <Form title={this.state.formTitle}
                  pokemon={this.state.pokemon}
                  onSubmit={this.onCreate.bind(this)}/>
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

    onCreate(pokemon: Pokemon) {
        this.clearSearch();
        if (typeof this.state.pokemon === 'undefined') {
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
        this.setState({
            pokemon,
            formTitle: `Actualizar pokemon ${pokemon.name}`,
        })
    }
}

export default Index;
