import React, {Component} from "react";
import Table from "../components/Table";
import Form from "../components/Form";

interface Props {
}

interface State {

}

class Index extends Component<Props, State> {
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
            <Table/>

            <Form title="Nuevo Pokemon"/>
        </main>);
    }
}

export default Index;
