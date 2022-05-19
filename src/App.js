import React from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.message !== ''){
      const chatRef = firebase.database().ref('general');
      const chat = {
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp: new Date().getTime()
      }

    chatRef.push(chat);
    this.setState({message: ''});
  }
}

render() {
  return (
    <div className="App ml-20 p-10">
      <h1>✉ Chat app</h1>
      {this.props.user && 
        <div className="allow-chat text-left ml-20 p-10">
          <Chatbox />
          <form className="message-form" onSubmit={this.onSubmit}>
          <input
            class="chat"
            type="text"
            name="message"
            id="message"
            value={this.state.message}
            placeholder="Enter a message..."
            onChange={this.onChange} />
          <button class="but">send</button>
          </form>
        </div>
      }
      {!this.props.user &&
        <div className="disallow-chat">
          <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
        </div>
      }
      </div>
    );
  }
}

export default App;
