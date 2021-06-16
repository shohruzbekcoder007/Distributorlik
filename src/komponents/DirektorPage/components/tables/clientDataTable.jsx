import React, { Component } from 'react';
import axios from 'axios';

import Table from './table'


class ClientDataTable extends Component {
    state = { orderList: []}
    componentDidMount = async() => {
        let response = await axios.get(this.props.url)
        this.setState({
            orderList: response.data,
        })
    }
    render() { 
        return (
        <div>       
            <Table name={this.props.name} headers={this.props.headers} orderList={this.state.orderList} />
        </div> );
    }

}
 
export default ClientDataTable;