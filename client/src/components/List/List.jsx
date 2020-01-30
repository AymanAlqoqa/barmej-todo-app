import React, { Component } from "react";
import Card from "./Card";

import "./style.css";

export default class List extends Component {
  render() {
    const { list, deletePost, refresh } = this.props;
    return (
      <>
        {list.length > 0 ? (
          <div className="list-container">
            <h2>My List</h2>
            <div className="list">
              {list.map(({ _id, ...rest }) => (
                <Card
                  key={_id}
                  {...rest}
                  id={_id}
                  deletePost={deletePost}
                  refresh={refresh}
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
