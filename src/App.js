import React from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchMessages } from "./store";

import MessageList from "./component/MessageList";
import MessageForm from "./component/MessageForm";

const apiURL = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      nick: ''
    }
  }

  componentDidMount() {
    setInterval(() => this.props.dispatch(fetchMessages()), 1000);
  }

  receiveMessages = () => {
    axios.get(apiURL).then((response) => {
      this.setState({messages: response.data});
    })
  };

  sendMessage = (data) => {
    axios.post(apiURL, JSON.stringify(data)
    ).then(response => this.setState({messages: response.data}));
  };

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages}/>
        <MessageForm sendMessage={this.sendMessage}/>
      </div>
    )
  }
}

export default connect()(App);
