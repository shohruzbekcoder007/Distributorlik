import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class SubmitExpense extends Component {
  state = {
    nomi: "",
    izox: "",
    miqdori: "",
    foydalanuvchi: "",
    usersdata: [],
    salarydata: [],
    deleteItem: [],
    btn_type: "Tasdiqlash",
    update: false,
    id: "",
    creditial: "",
    start_date: "",
  };
  componentDidMount() {
    this.getUsersData(this.state.start_date);
  }
  getUsersData = async (start_date) => {
    const url = "/api/expense_discount/expense-list/";
    axios(url, {
      params: {
        start_date: start_date,
      },
    }).then((res) => {
      this.setState({ usersdata: res.data.expenses });
    });
  };
  onSubmit = (e) => {
    const url = `/api/expense_discount/expense-detail/${e}/`;
    axios.patch(url, { approved: true }).then((response) => {
      console.log(response.data);
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((user) => user.id != e),
        });
      }
    });
  };
  onRefuse = (e) => {
    const url = `/api/expense_discount/expense-detail/${e}/`;
    axios.patch(url, { approved: false }).then((response) => {
      //   if (response.data != null) {
      //     this.setState({
      //       usersdata: this.state.usersdata.filter((user) => user.id != e),
      //     });
      //   }
    });
  };

  render() {
    const { usersdata } = this.state;
    let count = 0;
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Xarajatlarni Tasdiqlash"} />
        </div>
        <div className="register-box _expense">
          <div className="register-table-box table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/R</td>
                  <td scope="col">Nomi</td>
                  <td scope="col">Izox</td>
                  <td scope="col">Miqdori</td>
                  <td scope="col">Foydalanuvchi</td>
                  <td scope="col">Sana</td>
                  <td scope="col">Tasdiqlash</td>
                </tr>
              </thead>
              {usersdata.map((user) => {
                count++;
                {
                  if (user.approved === false) {
                    return (
                      <tbody key={user.id}>
                        <tr>
                          <td>{count}</td>
                          <td>{user.name}</td>
                          <td>{user.description}</td>
                          <td>{user.quantity}</td>
                          <td>
                            {user.user === null
                              ? "Ism kiritilmagan"
                              : user.user.first_name +
                                " " +
                                user.user.last_name}
                          </td>
                          <td>{user.created_date.slice(0, 10)}</td>
                          <td className="d-flex justify-content-center">
                            <i
                              className="far fa-check-circle"
                              onClick={() => this.onSubmit(user.id)}
                            ></i>
                            <i
                              className="fas fa-times-circle"
                              onClick={this.onRefuse.bind(this, user.id)}
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                }
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default SubmitExpense;
