import React from 'react';

import Loading from '../../../components/Loading';

import { Form } from 'react-bootstrap';
import Axios from 'axios';

class FormatDropdown extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            formatList: [],
            selectedFormat: 'Loading...',
            isLoading: true
        }
    }

    componentDidMount(){
        Axios.get('/deck/formats').then(res => {
            this.setState({
                isLoading: false,
                formatList: res.data.formats
            })
        }).catch(err => {
            console.error(err);
            this.setState({
                isLoading: false
            })
        })
    }

    render(){
        if(this.state.isLoading){
            return (
                <Loading />
            )
        }
        return (
            <Form.Group controlId="FormatSelector">
                <Form.Label>Select Format</Form.Label>
                <Form.Control as="select" name={this.props.name} onChange={this.props.onChange} value={this.props.value}>
                    {this.state.formatList.map(items => {
                        return (
                            <option key={items}>{items}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        )
    }
}

export default FormatDropdown