import React, {Component} from "react";

interface Props {
    title: string
}

interface State {

}

class Form extends Component<Props, State> {
    render() {
        return (<div>
            <h3 className="text-center">
                { this.props.title }
            </h3>

            <form>
                <div className="grid">
                    <div className="grid-item">
                        Nombre: <input type="text"/>
                    </div>
                    <div className="grid-item">
                        Imagen: <input type="text"/>
                    </div>
                    <div className="grid-item">
                        Ataque: <input type="text"/>
                    </div>
                    <div className="grid-item">
                        Defensa: <input type="text"/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="btn btn=primary">
                        Guardar
                    </button>
                    <button className="btn btn=secondary">
                        Cancelar
                    </button>
                </div>
            </form>

        </div>);
    }
}

export default Form;
