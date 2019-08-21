import React from 'react';
import './ManaCheckbox.css';

import ManaIcon from '../../../components/ManaIcon';

class ManaCheckbox extends React.Component {

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.onChange(this.props.icon);
    }

    render(){

        return (
            <div onClick={this.onClick} className={this.props.checked ? "ManaCheckbox ManaCheckbox-enabled" : "ManaCheckbox ManaCheckbox-disabled"}>
                <ManaIcon icon={this.props.icon} size="2em" />
            </div>
        )
    }
}

export default ManaCheckbox;