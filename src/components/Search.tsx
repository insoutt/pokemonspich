import React, {Component} from "react";
import Icon from "./Icon";
import search from '../assets/icons/magnify.svg'
import styles from './Search.module.css';

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
        return (<div className={styles.container}>
            <div className={styles.icon}>
                <Icon icon={search}/>
            </div>
            <input className={styles.search} value={this.state.value} placeholder="Buscar..." onChange={this.update.bind(this)} type="text"/>
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
