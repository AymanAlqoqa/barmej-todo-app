import React, { Component } from "react";
import Form from "../components/Form/Form";
import List from "../components/List/List";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Form />
        <List />
      </div>
    );
  }
}
