import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal } from "./modal";

class Discount extends Component {
  state = {
    nomi: "",
    miqdori: "",
    faolligi: "",
    deadline: "",
    mahsulot: [],
    discountdata: [],
    productList: [],
    show: false,
    discountList: [],
  };
  componentDidMount() {
    this.getDiscount();
    this.getproductList();
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createProductList = (e) => {
    this.setState((prevState) => ({
      mahsulot: [...prevState.mahsulot, e.target.value],
    }));
  };
  createDiscount = (event) => {
    event.preventDefault();
    const url = "/api/expense_discount/discount/";
    const { nomi, faolligi, miqdori, deadline, mahsulot } = this.state;
    let date = new Date(deadline);
    axios.post(url, {
      product: mahsulot,
      name: nomi,
      discount: miqdori,
      active: faolligi,
      deadline: date,
    });
  };

  getDiscount = () => {
    const url = "/api/expense_discount/discount/";
    axios(url).then((res) => this.setState({ discountdata: res.data }));
  };
  getproductList = () => {
    const url = "/api/product/product-list/";
    axios(url).then((res) => this.setState({ productList: res.data.products }));
  };
  closeModalHandler = () => this.setState({ show: false });

  ShowDiscountProduct = (e) => {
    const url = `/api/expense_discount/discount-products/${e}`;
    axios(url).then((res) => this.setState({ discountList: res.data }));
  };
  onDeleteDiscount = (e) => {
    const url = `/api/expense_discount/discount-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          discountdata: this.state.discountdata.filter((data) => data.id != e),
        });
      }
    });
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => this.onDeleteDiscount(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  render() {
    const { discountdata, productList, discountList } = this.state;
    let count = 0;
    return (
      <div className="register-box">
        {this.state.show ? (
          <div onClick={this.closeModalHandler} className="back-drop"></div>
        ) : null}
        <div className="register-form">
          <div className="title">
            <h2>Chegirmalar</h2>
          </div>
          <form className="input-form" onSubmit={this.createDiscount}>
            <input
              type="text"
              name="nomi"
              placeholder="Nomi"
              required
              onChange={this.handleInput}
            />
            <input
              type="number"
              name="miqdori"
              placeholder="Chegirma miqdori"
              required
              onChange={this.handleInput}
            />
            <span id="check-box">
              <input
                type="checkbox"
                id="active"
                className="mt-0 mr-3"
                name="faolligi"
                onChange={this.handleInput}
              />
              <label htmlFor="active">Faol</label>
            </span>
            <input type="date" name="deadline" onChange={this.handleInput} />
            <select name="mahsulot" onChange={this.createProductList} required>
              {productList.map((product) => {
                return (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                );
              })}
            </select>
            <button type="submit" className="btn btn-primary">
              Tasdiqlash
            </button>
          </form>
        </div>
        <Modal
          show={this.state.show}
          close={this.closeModalHandler}
          discountList={discountList}
        />
        <PageMap page_name={"Chegirmalar qo'shish"} />
        <div className="register-table-box table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Nomi</td>
                <td scope="col">Chegirma miqdori</td>
                <td scope="col">Faolligi</td>
                <td scope="col">Tugash sanasi</td>
                <td scope="col">O'chirish</td>
              </tr>
            </thead>

            {discountdata.map((dis) => {
              count++;
              if (dis.deadline !== null) {
                var splits = dis.deadline.slice(0, 10);
              } else {
                var splits = "null";
              }
              if (dis !== undefined) {
                return (
                  <tbody key={dis.id}>
                    <tr>
                      <td>{count}</td>
                      <td
                        className="show-discount-btn"
                        onClick={() =>
                          this.setState(
                            { show: true },
                            this.ShowDiscountProduct(dis.id)
                          )
                        }
                      >
                        {dis.name}
                      </td>
                      <td>{dis.discount + " %"}</td>
                      <td>{dis.active ? "Faol" : "Faol emas"}</td>
                      <td>{splits}</td>
                      <td className="d-flex justify-content-center">
                        <i
                          className="fas fa-trash"
                          onClick={this.onDeleteAlert.bind(this, dis.id)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                );
              } else {
                return <h2 className="loading">Loading...</h2>;
              }
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Discount;
