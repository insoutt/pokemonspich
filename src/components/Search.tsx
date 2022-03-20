import React, {Component} from "react";
import Icon from "./Icon";
import search from '../assets/icons/magnify.svg'

interface Props {
    onSearch?: (value: string) => void;
}

interface State {
    value: string
}

class Search extends Component<Props, State> {

    state = {
        value: '',
    };

    render() {
        return (<div className="flex">
            <div>
                <Icon icon={search}/>
            </div>
            <input value={this.state.value} placeholder="Buscar..." onChange={this.update.bind(this)} type="text"/>
        </div>);
    }

    private update(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        this.setState({value});

        if (typeof this.props.onSearch === 'function') {
            this.props.onSearch(value.toLocaleLowerCase());
        }
    }
}

export default Search;
