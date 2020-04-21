import React from "react";
import { connect } from 'react-redux'

const mapStateToProps = state => {
  const { messages } = state;
  return {messages}
};

const MessageList = (props) => {
  return (
    <ul>
      {props.messages.map((item, index) =>
        <li key={index}>
          <strong>{item.nick}</strong>: {item.message}
        </li>
      )}
    </ul>
  )
};

export default connect(mapStateToProps)(MessageList);