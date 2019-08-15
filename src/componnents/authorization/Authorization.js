import React from "react"
import Form from "../form/Form";
import './authorization.module.sass';

const  Authorization = () => {

    return(
      <div className="chat__authorization">
        <h2>Authorization</h2>
        <Form type="authorization"/>
      </div>
    )
};

export default Authorization;