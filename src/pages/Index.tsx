import React, {Component} from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import PokemonService, {Pokemon} from "../services/PokemonService";
import Search from "../components/Search";

interface Props {
}

interface State {
    pokemons: Pokemon[];
}

class Index extends Component<Props, State> {

    pokemons: Pokemon[] = []

    constructor(props: Props) {
        super(props);

        this.state = {
            pokemons: [],
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
            <Table pokemons={this.state.pokemons}/>

            <Form title="Nuevo Pokemon" onSubmit={this.onCreate.bind(this)}/>
        </main>);
    }

    getPokemons() {
        console.log('getpokemons')
        PokemonService.list().then(pokemons => {
            this.pokemons = pokemons;
            this.setState({pokemons});
        })
    }

    search(value: string) {
        const pokemons = this.pokemons.filter(pokemon => pokemon.name.toLocaleLowerCase().indexOf(value) !== -1);
        this.setState({pokemons});
    }

    onCreate(pokemon: Pokemon) {
        this.search('') // Limpiar búsqueda
        this.pokemons.push(pokemon);
        this.setState({
            pokemons: this.pokemons,
        })
    }
}

export default Index;
