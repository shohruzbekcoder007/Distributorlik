import React, { Component } from "react";

class ClientStatTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    if (typeof this.props.clientList === "undefined") {
      return <h1 className="loading">Loading...</h1>;
    } else {
      return (
        <tbody>
          {this.props.clientList.map((client) => {
            count++;
            console.log(client);
            return (
              <tr key={client.client.id}>
                <td>{count}</td>
                <td>{client.client.name}</td>
                <td>
                  {client.client.sale_agent.first_name +
                    `${" "}` +
                    client.client.sale_agent.last_name}
                </td>
                <td>{client.client.responsible_agent}</td>
                <td>{client.client.phone_number1}</td>
                <td>{client.client.address}</td>
                <td>{client.total_debt}</td>
              </tr>
            );
          })}
        </tbody>
      );
    }
  }
}

export default ClientStatTableBody;
