import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Expense extends Component {
  state = {
    nomi: "",
    izox: "",
    miqdori: "",
    kategoriya: "",
    foydalanuvchi: "",
    usersdata: [],
    userList: [],
    deleteItem: [],
    btn_type: "Tasdiqlash",
    update: false,
    id: "",
    creditial: "",
  };
  componentDidMount() {
    this.getUsersData();
    this.getUserList();
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
    event.preventDefault();
    const url = "/api/expense_discount/expense-list/";
    const { nomi, izox, miqdori, foydalanuvchi, kategoriya } = this.state;
    axios
      .post(url, {
        name: nomi,
        description: izox,
        quantity: miqdori,
        user: foydalanuvchi,
        category: kategoriya,
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
        nomi: "",
        izox: "",
        miqdori: "",
        foydalanuvchi: "",
        kategoriya: "",
        creditial: "Qo'shish muvaffaqiyatli bajarildi",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };

  getUsersData = async () => {
    const url = "/api/expense_discount/expense-list/";
    axios(url).then((res) => this.setState({ usersdata: res.data.expenses }));
  };

  getUserList = () => {
    const url = "/api/user/user-list/";
    axios(url).then((res) => this.setState({ userList: res.data }));
  };

  onExpenseDelete = (e) => {
    const url = "/api/expense_discount/expense-detail/";
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((user) => user.id != e),
        });
      }
    });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/expense_discount/expense-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        nomi: response.data.name,
        izox: response.data.description,
        miqdori: response.data.quantity,
        kategoriya: response.data.category,
        btn_type: "Saqlash",
        update: true,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/expense_discount/expense-detail/${this.state.id}/`;
    const { nomi, izox, miqdori, kategoriya } = this.state;
    axios.put(url, {
      name: nomi,
      description: izox,
      quantity: miqdori,
      category: kategoriya,
    });
    this.setState(
      {
        nomi: "",
        izox: "",
        miqdori: "",
        kategoriya: "",
        btn_type: "Tasdiqlash",
        update: false,
        creditial: "Muvaffaqiyatli yangilandi Kuting!",
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
          onClick: () => this.onExpenseDelete(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  render() {
    const { usersdata, userList } = this.state;
    let count = 0;
    return (
      <div className="register-box">
        <div className="register-form">
          <div className="title">
            <h2>Xarajatlar</h2>
          </div>
          <form
            className="input-form"
            onSubmit={this.state.update ? this.onUpdate : this.createUser}
          >
            <input
              type="text"
              name="nomi"
              placeholder="Nomi"
              required
              onChange={this.handleInput}
              value={this.state.nomi}
            />
            <select onChange={this.handleInput} name="kategoriya">
              <option value=""></option>
              <option value="marketing">Marketing uchun</option>
              <option value="others">Boshqa harajatlar uchun</option>
            </select>
            <textarea
              name="izox"
              placeholder="Izox"
              value={this.state.izox}
              onChange={this.handleInput}
            />
            <input
              type="number"
              name="miqdori"
              placeholder="Miqdori"
              value={this.state.miqdori}
              required
              onChange={this.handleInput}
            />
            <select name="foydalanuvchi" onChange={this.handleInput}>
              <option value=""></option>
              {userList.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name + " " + user.last_name}
                  </option>
                );
              })}
            </select>
            <label className="notification">{this.state.creditial}</label>
            <button className="btn btn-primary" type="submit">
              {this.state.btn_type}
            </button>
          </form>
        </div>
        <h3 className="mb-3">Xarajatlar</h3>
        <div className="register-table-box table-responsive mt-5">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Nomi</td>
                <td scope="col">Kategoriya</td>
                <td scope="col">Izox</td>
                <td scope="col">Miqdori</td>
                <td scope="col">Foydalanuvchi</td>
                <td scope="col">Tahrirlash</td>
              </tr>
            </thead>

            {usersdata.map((user) => {
              count++;
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{count}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.category === "others"
                        ? "Boshqa harajatlar"
                        : "Marketing uchun"}
                    </td>
                    <td>{user.description}</td>
                    <td>{user.quantity}</td>
                    <td>
                      {user.user === null
                        ? "Ism kiritilmagan"
                        : user.user.first_name + " " + user.user.last_name}
                    </td>
                    <td className="d-flex justify-content-center">
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

export default Expense;
