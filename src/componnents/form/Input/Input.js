import React from "react"

function Input(props) {
  return (
    <input
      type="text"
      name="login"
      placeholder="Enter your login"
      onChange={(e) => this.handleChange(e)}
    />

    // <input
    //   type="text"
    //   name="message"
    //   placeholder="Enter your message"
    //   onChange={this.handleChange}
    // />
  )
}

export default Input