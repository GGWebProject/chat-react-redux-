import React, {PureComponent, createRef} from "react";
import { connect } from "react-redux"
import {logIn, sendUserMessage} from "../../redux/actions";
function createMessage(user, text) {
  return { from: user, message: text };
}

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      userName: null,
    };
    this.inputMessageRef = createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.authorization = this.authorization.bind(this);
  }

  handleChange(e) {
    const { value: inputValue } = e.currentTarget;
    this.setState({
      inputValue,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { logged } = this.props;
    if (logged.status) {
      this.sendMessage()
    } else {
      this.authorization();
    }
    return false
  }

  authorization() {
    const { inputValue } = this.state;
    const { logIn } = this.props;
    inputValue && logIn(inputValue);
  }

  sendMessage() {
    const { inputValue, userName } = this.state;
    const { sendUserMessage } = this.props;
    const userMessage = inputValue && createMessage(userName, inputValue);
    if (userMessage) {
      this.setState({
        userMessage,
      });
      sendUserMessage(userMessage);
      this.inputMessageRef.current.value = "";
    }
  }

  componentDidMount() {
    const { logged } = this.props;
    const userName = window.localStorage.getItem('userName');

    if (logged.status) {
      this.setState({userName});
    } else {
      this.setState({
        userName,
        inputValue: userName
      });
    }
  }

  render () {
    const { inputValue } = this.state;
    const { logged } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {
          logged.status ?
            <>
              <input
                type="text"
                name="message"
                placeholder="Enter your message"
                onInput={this.handleChange}
                ref={this.inputMessageRef}
              />
              <button type="submit">Send</button>
            </>
            :
            <>
              <input
                type="text"
                name="login"
                placeholder="Enter your login"
                onInput={this.handleChange}
                defaultValue={this.state.userName}
              />
              <button type="submit">LogIN</button>
              { !inputValue &&
              <span className="input__description">*Для входа в чат введите ваше имя</span> }
            </>
        }
      </form>
    )
  }
}

const mapStateToProps = state => {
  const { logged } = state;
  return { logged };
};

export default connect(mapStateToProps, {logIn, sendUserMessage})(Form);
