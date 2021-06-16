import React, { Component } from 'react';

class WarehouseTableBody extends Component {
    state = {}
    render() {
        let count = 0;
        if (typeof this.props.productList.warehouse_objects === "undefined") {
            return <h1 className="loading">Loading...</h1>
        } else {
            return (<tbody >
                {this.props.productList.warehouse_objects.map(product => {
                    var splits = product.updated_date.slice(0, 10);
                    count++;
                    return (
                        <tr key={product.id}>
                            <td>{count}</td>
                            <td >{product.product.provider.name}</td>
                            <td>{product.product.category.name}</td>
                            <td>{product.product.name}</td>
                            <td>{product.quantity + `${''}` + product.product.unit}</td>
                            <td className="text-success">{product.last_price}</td>
                            <td>{splits}</td>
                        </tr>
                    )
                })}
            </tbody>);
        }

    }
}

export default WarehouseTableBody;