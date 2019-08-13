import React from 'react';

import './Loading.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSync } from '@fortawesome/free-solid-svg-icons'

import { Spinner } from 'react-bootstrap';

class Loading extends React.Component{
    render(){
        return (
            <div className="Loading">
                {/* <FontAwesomeIcon className="Loading-icon fa-spin" icon={faSync}>
                
                </FontAwesomeIcon> */}
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                    </Spinner>
            </div>
            
        )
    }
}

export default Loading;