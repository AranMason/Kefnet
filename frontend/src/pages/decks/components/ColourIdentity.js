import React from 'react';

import { Form } from 'react-bootstrap';

class ColourIdentity extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            colours: ['White', 'Blue', 'Black', 'Red', 'Green']
        }
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>
                    {this.props.title || 'Colour Identity'}
						</Form.Label>
                <div>
                    {this.state.colours.map(colour => {
                        return (
                            <Form.Check 
                                name={colour}
                                onChange={this.props.onChange}
                                checked={this.props.value[colour]}
                                inline label={colour}
                                type="checkbox"
                                key={colour} />
                        )
                    })}

                </div>
            </Form.Group>

        )
    }
}

export default ColourIdentity;