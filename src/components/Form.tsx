import React, {Component} from "react";
import ValidationProvider from "../providers/ValidationProvider";
import PokemonService, {Pokemon, PokemonType} from "../services/PokemonService";

interface Props {
    title: string
    onSubmit: (pokemon: Pokemon) => void
    onCancel?: () => void
    pokemon?: Pokemon
}

interface State {
    name: string
    image: string
    attack: string
    defense: string
    hp: string
    type: PokemonType | ''

    error: boolean
    message: string
    submit: boolean
}

type InputType = 'name' | 'image' | 'attack' | 'defense' | 'hp' | 'type';

const NAMES = {
    name: 'Nombre',
    image: 'Imagen',
    attack: 'Ataque',
    defense: 'Defensa',
    hp: 'HP',
    type: 'Tipo',
}

// 'fire' | 'water' | 'normal' | 'bug' | 'poison';
const pokemonTypes = [
    {
        name: 'Fuego',
        value: 'fire',
    },
    {
        name: 'Agua',
        value: 'water',
    },
    {
        name: 'Normal',
        value: 'normal',
    },
    {
        name: 'Bicho',
        value: 'bug',
    },
    {
        name: 'Veneno',
        value: 'poison',
    },
]

class Form extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            image: '',
            attack: '',
            defense: '',
            hp: '',
            type: '',
            error: false,
            message: '',
            submit: false,
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
        if (this.props.pokemon?.id !== nextProps.pokemon?.id) {
            this.setPokemon(nextProps.pokemon);
        }
    }

    render() {
        return (<div>
            <h3 className="text-center">
                { this.props.title }
            </h3>

            {this.state.error && <div className="alert alert-danger">
                {this.state.message}
            </div>}

            <form onSubmit={event => event.preventDefault()}>
                <div className="grid">
                    <div className="grid-item">
                        <label htmlFor="name">Nombre:</label> <input id="name" value={this.state.name}  onChange={(event) => this.updateInput(event, 'name')} type="text"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="attack">Ataque:</label> <input id="attack" value={this.state.attack} onChange={(event) => this.updateInput(event, 'attack')} type="text"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="image">Imagen:</label> <input id="image" value={this.state.image} onChange={(event) => this.updateInput(event, 'image')} type="text"/>
                    </div>
                    <div className="grid-item">
                        <label htmlFor="defense">Defensa:</label> <input id="defense" value={this.state.defense} onChange={(event) => this.updateInput(event, 'defense')} type="text"/>
                    </div>

                    <div className="grid-item">
                        <label htmlFor="type">Tipo:</label>
                        <select id="type" value={this.state.type} onChange={(event) => this.updateInput(event, 'type')}>
                            <option value="">Seleccione...</option>
                            {pokemonTypes.map(type => <option key={type.value} value={type.value}>{type.name}</option>)}
                        </select>
                    </div>

                    <div className="grid-item">
                        <label htmlFor="hp">HP:</label> <input id="hp" value={this.state.hp} onChange={(event) => this.updateInput(event, 'hp')} type="text"/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={this.submit.bind(this)} className="btn btn=primary">
                        Guardar
                    </button>
                    <button onClick={this.cancel.bind(this)} className="btn btn=secondary">
                        Cancelar
                    </button>
                </div>
            </form>

        </div>);
    }

    private updateInput(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: InputType) {
        const value = event.target.value;
        const data: {
            [name: string]: string
        } = {};
        data[name] = value;

        // @ts-ignore
        this.setState(data);


        switch (name) {
            case "name":
                this.validateString(name, value);
                break;
            case "attack":
            case "defense":
            case "hp":
                this.validateNumber(name, value)
                break;
            case "image":
                this.validateImage(value);
                break;
            case "type":
                this.validateSelect(name, value);
                break;
            default:
                throw new Error("No existe validación para el campo: " + name)

        }
    }

    private submit() {
        this.setState({submit: true});

        if (!this.validateString('name', this.state.name)) {
            return;
        }
        if (!this.validateImage(this.state.image)) {
            return;
        }
        if (!this.validateSelect('type', this.state.type)) {
            return;
        }
        if (!this.validateNumber('attack', this.state.attack)) {
            return;
        }
        if (!this.validateNumber('defense', this.state.defense)) {
            return;
        }
        if (!this.validateNumber('hp', this.state.defense)) {
            return;
        }


        console.log('submit');

        if (typeof this.props.pokemon === 'undefined') {
            this.create();
            return;
        }

        this.update();
    }

    private cancel() {
        if (typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
        this.clear();
    }

    private clear() {
        this.hideError();
        this.setState({
            name: '',
            image: '',
            defense: '',
            attack: '',
            hp: '',
            type: '',
        })
    }

    private validateString(name: InputType, value: string) {
        if (!ValidationProvider.min(value)) {
            this.showError(`El campo ${NAMES[name]} es obligatorio y debe tener al menos 3 caracteres.`);
            return false;
        }
        this.hideError();
        return true;
    }

    private validateImage(value: string) {
        if (!ValidationProvider.image(value)) {
            this.showError(`La imagen debe ser una URL válida y de tipo png ó jpg.`);
            return false;
        }
        this.hideError();
        return true;
    }

    private validateNumber(name: InputType, value: string) {
        if (!ValidationProvider.number(value)) {
            this.showError(`El campo ${NAMES[name]} debe ser un número entre 0 y 100.`);
            return false;
        }
        this.hideError();
        return true;
    }

    private validateSelect(name: InputType, value: string) {
        if (!value) {
            this.showError(`El campo ${NAMES[name]} no es válido, debe seleccionar un valor.`);
            return false;
        }
        this.hideError();
        return true;

    }

    private showError(message: string) {
        if (!this.state.submit) {
            return;
        }

        this.setState({
            error: true,
            message,
        })
    }

    private hideError() {
        this.setState({
            error: false,
            message: '',
        })
    }

    private create() {
        PokemonService.create({
            name: this.state.name,
            attack: parseInt(this.state.attack),
            defense: parseInt(this.state.defense),
            image: this.state.image,
            hp: parseInt(this.state.hp),
            type: this.state.type as PokemonType,
        })
            .then(pokemon => {
                this.clear();
                this.props.onSubmit(pokemon);
            }).catch(() => {
            alert('Ha ocurrido un error, compruebe su conexión a Internet y vuelva a intentarlo.');
        })
    }

    private update() {
        if (!this.props.pokemon?.id) {
            alert('No se puede actualizar el pokemon actual, recargue la página e intente nuevamente');
            return;
        }

        PokemonService.update(this.props.pokemon.id,{
            name: this.state.name,
            attack: parseInt(this.state.attack),
            defense: parseInt(this.state.defense),
            image: this.state.image,
            hp: parseInt(this.state.hp),
            type: this.state.type as PokemonType,
        })
            .then(pokemon => {
                this.clear();
                this.props.onSubmit(pokemon);
            }).catch(() => {
                alert('Ha ocurrido un error, compruebe su conexión a Internet y vuelva a intentarlo.');
            })
    }

    private setPokemon(pokemon: Pokemon | undefined) {
        if (!pokemon) {
            return;
        }

        this.setState({
            name: pokemon.name,
            attack: pokemon.attack.toString(),
            defense: pokemon.defense.toString(),
            image: pokemon.image,
            hp: pokemon.hp.toString(),
            type: pokemon.type,
        })
    }
}

export default Form;
