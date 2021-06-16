import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PageMap from "../page-road-map/page-map";

import axios from "axios";

class Register extends Component {
  state = {
    users: [],
    ism: "",
    familya: "",
    role: "",
    telefon: "",
    parol: "",
    tasdiqlash: "",
    usersdata: [],
    btn_type: "Qo'shish",
    update: false,
    id: "",
    creditial: "",
  };
  componentDidMount() {
    this.getUsersData();
  }
  componentDidUpdate(prevState) {
    if (prevState !== this.state.usersdata) {
      this.getUsersData();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createUser = (event) => {
    const url = "/api/user/register/";
    const { ism, familya, role, telefon, parol, tasdiqlash } = this.state;
    event.preventDefault();
    axios
      .post(url, {
        first_name: ism,
        last_name: familya,
        role: role,
        phone_number: telefon,
        password: parol,
        password2: tasdiqlash,
      })
      .then((data) =>
        this.setState((prevState) => ({
          usersdata: [
            ...prevState.usersdata,
            {
              ...data.data,
            },
          ],
        }))
      );
    this.setState(
      {
        ism: "",
        familya: "",
        role: "",
        telefon: "",
        parol: "",
        tasdiqlash: "",
        creditial: "Qo'shish muvaffaqiyatli bajarildi Kuting!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };

  getUsersData = () => {
    const url = "/api/user/user-list/";
    axios(url).then((res) => this.setState({ usersdata: res.data }));
  };
  onDelete = (e) => {
    const url = `/api/user/user-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((data) => data.id != e),
        });
      }
    });
  };
  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/user/user-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        ism: response.data.first_name,
        familya: response.data.last_name,
        role: response.data.role,
        telefon: response.data.phone_number,
        btn_type: "Saqlash",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/user/user-detail/${this.state.id}/`;
    const { ism, familya, role, telefon } = this.state;
    axios.put(url, {
      first_name: ism,
      last_name: familya,
      role: role,
      phone_number: telefon,
    });
    this.setState(
      {
        ism: "",
        familya: "",
        role: "",
        telefon: "",
        btn_type: "Qo'shish",
        update: false,
        creditial: "O'zgartirish muvaffaqiyatli bajarildi Kuting!",
        usersdata: this.state.usersdata,
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  render() {
    const { usersdata } = this.state;
    let count = 0;
    return (
      <div className="register-box">
        <div className="register-form">
          <div className="user-logo">
            <i className="fas fa-user"></i>
          </div>
          <form
            className="input-form"
            onSubmit={this.state.update ? this.onUpdate : this.createUser}
          >
            <label className="notification">{this.state.creditial}</label>
            <input
              type="text"
              name="ism"
              placeholder="Ism"
              value={this.state.ism}
              required
              onChange={this.handleInput}
            />
            <input
              type="text"
              name="familya"
              placeholder="Familya"
              value={this.state.familya}
              required
              onChange={this.handleInput}
            />
            <select
              name="role"
              value={this.state.role}
              onChange={this.handleInput}
            >
              <option value="director">Direktor</option>
              <option value="CEO">CEO</option>
              <option value="accountant">Omborchi</option>
              {/* <option value="commodity_Accountant">Tovar buxgalteri</option> */}
              <option value="cashier">Kassir</option>
              <option value="agent">Agent</option>
            </select>
            <input
              type="number"
              name="telefon"
              placeholder="Telefon Raqam"
              value={this.state.telefon}
              onChange={this.handleInput}
            />
            <input
              type="password"
              name="parol"
              value={this.state.parol}
              placeholder="Parol"
              onChange={this.handleInput}
            />
            <input
              type="password"
              name="tasdiqlash"
              value={this.state.tasdiqlash}
              placeholder="Parolni Takrorlang"
              onChange={this.handleInput}
            />
            <button className="btn btn-primary" type="submit">
              {this.state.btn_type}
            </button>
          </form>
        </div>
        <PageMap page_name={"Xodim qo'shish"} />
        <div className="register-table-box table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Ism</td>
                <td scope="col">Familya</td>
                <td scope="col">Lavozimi</td>
                <td scope="col">Telefon Raqam</td>
                <td scope="col">Tahrirlash</td>
              </tr>
            </thead>

            {usersdata.map((user) => {
              count++;
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{count}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      {user.role === "director"
                        ? "Direktor"
                        : user.role === "agent"
                        ? "Agent"
                        : user.role === "cashier"
                        ? "Kassir"
                        : user.role === "accountant"
                        ? "Omborchi"
                        : user.role}
                    </td>
                    <td>{user.phone_number}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={this.onEdit.bind(this, user.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={this.onDeleteAlert.bind(this, user.id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Register;
