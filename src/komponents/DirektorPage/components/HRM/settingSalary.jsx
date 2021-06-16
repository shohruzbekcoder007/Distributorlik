import axios from "axios";
import React, { Component } from "react";

class SettingSalary extends Component {
  state = {
    users: [],
    fixedSalaryList: [],
    salaryList: [],
    userID: 0,
    roleID: 0,
    btn_type: "Tasdiqlash",
    update: false,
    id: "",
    creditial: "",
  };

  getSalaryList = async () => {
    let salaryList = await axios.get("/api/salary/salary-list/");
    this.setState({
      salaryList: salaryList.data,
    });
  };
  componentDidMount = async () => {
    let users = await axios.get("/api/user/user-list/");
    let fixedSalaryList = await axios.get("/api/salary/fixed-salary-list/");
    this.setState({
      users: users.data,
      fixedSalaryList: fixedSalaryList.data,
    });
    this.getSalaryList();
  };

  componentDidUpdate(prevState) {
    if (prevState !== this.state.salaryList) {
      this.getSalaryList();
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setSalary = (e) => {
    e.preventDefault();
    let roleID = this.state.roleID;
    let userID = this.state.userID;
    axios
      .post("/api/salary/salary-list/", { salary: roleID, user: userID })
      .then((data) =>
        this.setState((prevState) => ({
          salaryList: [
            ...prevState.salaryList,
            {
              ...data.data,
            },
          ],
        }))
      );
    this.setState(
      {
        roleID: "",
        userID: "",
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
  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/salary/salary-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        roleID: response.data.salary,
        userID: response.data.user,
        btn_type: "Saqlash",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/salary-detail/${this.state.id}/`;
    const { userID, roleID } = this.state;
    axios.put(url, {
      user: userID,
      salary: roleID,
    });

    this.setState(
      {
        roleID: "",
        userID: "",
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
  render() {
    let count = 0;
    return (
      <div className="solary-box">
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.setSalary}
        >
          <select
            name="userID"
            value={this.state.userID}
            onChange={this.handleInput}
          >
            <option value={0}>Kimga...</option>
            {this.state.users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.first_name + " " + user.last_name}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="roleID"
            value={this.state.roleID}
            onChange={this.handleInput}
          />
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Lavozim</td>
                <td scope="col">Oylik Maosh</td>
                <td scope="col">Tahrirlash</td>
              </tr>
            </thead>
            <tbody>
              {this.state.salaryList.map((data) => {
                count++;
                if (data !== undefined) {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>
                        {data.user.first_name + " " + data.user.last_name}
                      </td>
                      <td>{data.salary}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                } else {
                  return <h1>Loading...</h1>;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SettingSalary;
