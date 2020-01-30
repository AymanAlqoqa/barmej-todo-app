import React, { Component } from "react";
import Form from "../components/Form/Form";
import List from "../components/List/List";
import { LIST_URI } from "../constants/URI";

export default class Home extends Component {
  state = {
    list: []
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
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
    fetch(`${LIST_URI}/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => this.refresh())
      .catch(err => console.log(err));
  };

  refresh = () => {
    this.fetchData();
  };
  render() {
    return (
      <div>
        <Form refresh={this.refresh} />
        <List
          list={this.state.list}
          deletePost={this.handleDelete}
          refresh={this.refresh}
        />
      </div>
    );
  }
}
