import React from 'react';

import Header from './Header';

import axios from 'axios';

class Container extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "Unknown",
            success: false
        }
    }

    componentDidMount(){
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:3001/login',
        //     data: {
        //           username: "Aran",
        //           password: "12345"
        //       }
        //   }).then(res => {
        //       console.log(res.data);
        //     this.setState({...res.data})
        //   })
    }

    render(){
        return (
            <div className="Container">
                <Header/>
                {this.state.user && this.state.user.username}
            </div>
        )
    }
}

export default Container;