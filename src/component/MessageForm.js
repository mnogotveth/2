import React from "react";
import { connect } from 'react-redux'
import { sendMessage } from './../store'

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: '',
      message: ''
    }
  }

  sendMessage = () => {
    this.props.dispatch(sendMessage({
      message: this.state.message,
      nick: this.state.nick
    }));
    this.setState({message: ''});
  };

  render() {
    const {nick, message} = this.state;

    return (
      <form>
        <input type="text"
               value={nick}
               onChange={(event) => this.setState({nick: event.target.value})}/>
        <br/>
        <textarea
          value={message}
          onChange={(event => this.setState({message: event.target.value}))}>
          </textarea>
        <br/>
        <input type="button" value="Send" onClick={this.sendMessage}/>
      </form>
    )
  }
}

export default connect()(MessageForm);