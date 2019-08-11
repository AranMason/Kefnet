import React from 'react';

import Login from './Login';

class Header extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <div>
                Header
                <Login/>
            </div>
        )
    }
}

export default Header;