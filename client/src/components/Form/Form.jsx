import React, { Component } from "react";
import { LIST_URI } from "../../constants/URI";
import "./style.css";

export default class Form extends Component {
  state = {
    title: "",
    description: ""
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAdd = () => {
    const { title, description } = this.state;
    fetch(LIST_URI, {
      method: "post",
      headers: {
        "Content-Type": "Application/Json"
      },
      body: JSON.stringify({
        title,
        description
      })
    })
      .then(res => res.json())
      .then(res => {
        this.props.refresh();
        this.setState({
          title: "",
          description: ""
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    const { title, description } = this.state;
    return (
      <div className="form">
        <h1>Todo APP</h1>
        <input
          type="text"
          name="title"
          onChange={this.handleInput}
          value={title}
          placeholder="Enter title..."
        />
        <input
          type="text"
          name="description"
          onChange={this.handleInput}
          value={description}
          placeholder="Enter description..."
        />
        <button onClick={this.handleAdd}>
          <i className="material-icons">add</i>
          <span>add</span>
        </button>
      </div>
    );
  }
}
