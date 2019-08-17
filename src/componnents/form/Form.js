import React, {PureComponent, createRef} from "react";
import { connect } from "react-redux"
import {logIn, sendUserMessage} from "../../redux/actions";
import Button from "../button/Button";
function createMessage(user, text) {
  return { from: user, message: text };
}

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      userName: null,
      formValid: false,
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
      formValid: !!inputValue,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { logged } = this.props;
    const { formValid } = this.state;
    const { currentTarget: form } = e;

    if (!formValid) return false;

    if (logged.status) {
      this.sendMessage()
    } else {
      form.classList.add('login');
      this.authorization();
    }
  }

  authorization() {
    const { inputValue } = this.state;
    const { logIn } = this.props;
    setTimeout(()=>{
      logIn(inputValue);
    }, 1300);
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
        inputValue: userName,
        formValid: true
      });
    }
  }

  render () {
    const { inputValue, formValid } = this.state;
    const { logged } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={!formValid ? 'incorrect' : ''}>
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
              <Button type="send"/>
            </>
            :
            <>
              <h3>Authorization</h3>
              <input
                type="text"
                name="login"
                placeholder="Login"
                onInput={this.handleChange}
                defaultValue={this.state.userName}
              />
              <Button type="login">Sign in</Button>
              { !inputValue &&
              <span className="input__description">* Enter your name to enter the chat</span> }
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
