import React from "react";
import { LIST_URI } from "../../constants/URI";

export default class Card extends React.Component {
  state = {
    edit: false,
    title: "",
    description: ""
  };

  // display normal card
  fixedCard = () => {
    const { title, description, deletePost, id } = this.props;
    return (
      <div className="card">
        <span className="card-delete-edit">
          <span onClick={() => deletePost(id)}>
            <i className="material-icons">delete</i>
          </span>
          <span onClick={this.edit}>
            <i className="material-icons">edit</i>
          </span>
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };

  edit = () => {
    this.setState({
      edit: true,
      title: this.props.title,
      description: this.props.description
    });
  };

  // handle onChange for inputs
  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // handle Save
  handleSave = () => {
    const { id, refresh } = this.props;
    const { title, description } = this.state;

    fetch(`${LIST_URI}/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.updated) {
          refresh();
          this.setState({ edit: false });
        }
      })
      .catch(err => console.log(err));
  };
  //display editable card
  editCard = () => {
    const { title, description } = this.state;
    return (
      <div className="card">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={this.handleOnChange}
        />
        <textarea
          name="description"
          value={description}
          rows="5"
          placeholder="description"
          onChange={this.handleOnChange}
        />
        <span className="edit-btn-container">
          <button onClick={this.handleSave}>Save</button>
          <button
            className="cancel-btn"
            onClick={() => this.setState({ edit: false })}
          >
            Cancel
          </button>
        </span>
      </div>
    );
  };
  render() {
    const { edit } = this.state;
    return !edit ? this.fixedCard() : this.editCard();
  }
}
