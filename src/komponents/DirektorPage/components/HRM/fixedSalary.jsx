import axios from "axios";
import React, { Component } from "react";

class FixedSalary extends Component {
  state = {
    oylik: "",
    role: "",
    flexible: false,
    usersdata: [],
    btn_type: "Tasdiqlash",
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
  setSalary = (event) => {
    const url = "/api/salary/fixed-salary-list/";
    const { oylik, role, flexible } = this.state;
    event.preventDefault();
    axios
      .post(url, {
        role: role,
        salary_quantity: oylik,
        flexible: flexible,
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
        oylik: 0,
        role: "",
        btn_type: "Tasdiqlash",
        update: false,
        flexible: false,
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
    const url = "/api/salary/fixed-salary-list/";
    axios(url).then((res) => {
      this.setState({ usersdata: res.data });
    });
  };
  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/salary/fixed-salary-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        oylik: response.data.salary_quantity,
        role: response.data.role,
        flexible: response.data.flexible,
        btn_type: "Saqlash",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/fixed-salary-detail/${this.state.id}/`;
    const { oylik, role, flexible } = this.state;
    axios.put(url, {
      role: role,
      salary_quantity: oylik,
      flexible: flexible,
    });
    this.setState(
      {
        oylik: "",
        role: "",
        flexible: false,
        btn_type: "Tasdiqlash",
        update: false,
        creditial: "O'zgartirish muvaffaqiyatli bajarildi Kuting!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  render() {
    const { usersdata } = this.state;
    let count = 0;
    return (
      <div className="solary-box">
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.setSalary}
        >
          <input
            type="text"
            name="oylik"
            placeholder="Oylik maosh"
            value={this.state.oylik}
            required
            onChange={this.handleInput}
          />
          <select
            name="role"
            value={this.state.role}
            required
            onChange={this.handleInput}
          >
            <option value="director">Direktor</option>
            <option value="CEO">CEO</option>
            <option value="accountant">Omborchi</option>
            <option value="cashier">Kassir</option>
            <option value="agent">Agent</option>
          </select>
          <span>
            <input
              name="flexible"
              id="checkbox"
              type="checkbox"
              value={this.state.flexible}
              onChange={this.handleInput}
            />
            <label htmlFor="checkbox">O'zgaruvchan</label>
          </span>
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table  table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Lavozim</td>
                <td scope="col">Oylik Maosh</td>
                <td scope="col">O'zgaruvchan</td>
                <td scope="col">Tahrirlash</td>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user) => {
                count++;
                return (
                  <tr key={user.id}>
                    <td>{count}</td>
                    <th>
                      {user.role === "director"
                        ? "Direktor"
                        : user.role === "agent"
                        ? "Agent"
                        : user.role === "cashier"
                        ? "Kassir"
                        : user.role === "accountant"
                        ? "Omborchi"
                        : user.role}
                    </th>
                    <td>{user.salary_quantity}</td>
                    <td>{user.flexible ? "O'zgaruvchan" : "O'zgarmas"}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={this.onEdit.bind(this, user.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FixedSalary;
