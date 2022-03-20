import React, {Component} from "react";

interface Props {
    icon: string
    alt?: string
}

interface State {

}

class Icon extends Component<Props, State> {
    render() {
        return (<>
            <img src={this.props.icon} alt={this.props.alt || 'Icon'}/>
        </>);
    }
}

export default Icon;
