import React, { Component } from "react";
class SellTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    let total_price = 0;
    if (typeof this.props.orderList.sell_order_list === "undefined") {
      return <h1 className="loading">Loading...</h1>;
    } else {
      return (
        <>
          <tbody>
            {this.props.orderList.sell_order_list.map((order) => {
              var splits = order.created_date.slice(0, 10);
              total_price += order.quantity * order.price;
              count++;
              return (
                <tr key={order.id}>
                  <td>{count}</td>
                  <td>{order.client.name}</td>
                  <td>
                    {order.client.sale_agent.first_name +
                      `${" "}` +
                      order.client.sale_agent.last_name}
                  </td>
                  <td>{order.product.category.name}</td>
                  <td>{order.product.name}</td>
                  <td>{order.status}</td>
                  <td>{order.quantity + `${""}` + order.product.unit}</td>
                  <td className="text-success">{order.price}</td>
                  <td>{order.quantity * order.price}</td>
                  <td className="text-danger">{order.debt}</td>
                  <td>{splits}</td>
                </tr>
              );
            })}
          </tbody>
          <div className="total-price">
            <span>Jami qiymati: </span>
            <p>{total_price + " So'm"}</p>
          </div>
        </>
      );
    }
  }
}

export default SellTableBody;
