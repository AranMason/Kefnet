import React from 'react';
import './ColourIdentity.css';

import { Form } from 'react-bootstrap';
import ManaIcon from '../../../components/ManaIcon';
import ManaCheckbox from './ManaCheckbox';

class ColourIdentity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            colours: ['White', 'Blue', 'Black', 'Red', 'Green'],
        }

        // this.onClick = this.onClick.bind(this);
        this.handleChangeIcon = this.handleChangeIcon.bind(this);
    }

    handleChangeIcon(colour){
        this.props.onChange({
            target: "ColourIdentity",
            value: colour
        })
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>
                    {this.props.title || 'Colour Identity'}
                </Form.Label>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {this.state.colours.map(col => {
                        
                        return (
                            <ManaCheckbox
                                key={col}
                                icon={col}
                                checked={this.props.value[col]}
                                onChange={this.handleChangeIcon}/>
                        )
                    })}
                </div>
            </Form.Group>

        )
    }
}

export default ColourIdentity;