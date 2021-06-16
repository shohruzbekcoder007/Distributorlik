import React, { Component } from 'react';
class ControlPlans extends Component {
    state = {

    }
    render() {
        return (
            <div className="report-box">
                <table className="table table-box">
                    <thead>
                        <tr>
                            <th scope="col">Reja Nomi</th>
                            <th scope="col">Agent</th>
                            <th scope="col">Bajarilgan Foizi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.userReport.map(report => {
                                return (
                                    <tr key={report.id}>
                                        <td>Reja Nomi</td>
                                        <td>Agent</td>
                                        <td>Bajarilgan Foizi</td>
                                        <td><i className="fas fa-edit"></i></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ControlPlans;