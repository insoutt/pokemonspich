import React, {Component} from "react";
import Table from "../components/Table";
import Form from "../components/Form";
import PokemonService, {Pokemon} from "../services/PokemonService";

interface Props {
}

interface State {
    pokemons: Pokemon[];
}

class Index extends Component<Props, State> {

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
                <div>
                    <input type="text"/>
                </div>
                <div>
                    <button>Nuevo</button>
                </div>
            </div>
            <Table pokemons={this.state.pokemons}/>

            <Form title="Nuevo Pokemon"/>
        </main>);
    }

    getPokemons() {
        console.log('getpokemons')
        PokemonService.list().then(pokemons => {
            console.log(pokemons);
            this.setState({pokemons});
        })
    }
}

export default Index;
