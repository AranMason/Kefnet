import React from 'react';

class Provider extends React.Component{

    // constructor(props){
    //     super(props)
    // }

    render(){
        return (
            <p>
                {this.props.provider}
            </p>
        )
    }

}