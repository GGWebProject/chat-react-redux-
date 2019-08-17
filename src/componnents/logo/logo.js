import React from 'react';
import rssLogo from "../../assets/login-page_image/logo_rs.svg";

const Logo = (props) => {
  const { className, handleClick } = props;
  return (
    <div className={`logo ${className || ''}`} onClick={handleClick || null}>
      <div className="wrapper wrapper_img">
        <img src={rssLogo} alt="RSS logo"/>
      </div>
      <span>Chat</span>
    </div>
  )
};

export default Logo;