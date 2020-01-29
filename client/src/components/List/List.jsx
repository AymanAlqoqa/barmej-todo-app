import React, { Component } from "react";
import Card from "./Card";
import { LIST_URI } from "../../constants/URI";
import "./style.css";

export default class List extends Component {
  state = {
    list: [],
    errorMessage: ""
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(LIST_URI)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Error: Not Found........");
      })
      .then(res => this.setState({ list: res }))
      .catch(err => {
        this.setState({ errorMessage: err.message }, () => {
          setTimeout(() => this.setState({ errorMessage: "" }), 2000);
        });
      });
  }
  handleDelete = id => {
    console.log(`${LIST_URI}/${id}`);
    fetch(`${LIST_URI}/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    const { list, errorMessage } = this.state;
    return (
      <>
        {errorMessage && <span className="error">{errorMessage}</span>}
        {list.length > 0 ? (
          <div className="list-container">
            <h2>My List</h2>
            <div className="list">
              {list.map(({ id, ...rest }) => (
                <Card
                  key={id}
                  {...rest}
                  id={id}
                  deleteCard={this.handleDelete}
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
