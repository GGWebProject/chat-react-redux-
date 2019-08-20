import React from 'react';
import {useDispatch} from 'react-redux';
import {join} from '../../redux/actions';
import Logo from "../logo/logo";

const AppHeader = () => {
  const dispatch = useDispatch();
  return (
    <div className="chat-app__header">
      <div className="wrapper wrapper__block">
        <h1 className="visually-hidden">Rolling scopes school chat</h1>
        <Logo className="header__title" handleClick={() => dispatch(join())}/>
      </div>
    </div>
  )
};

export default AppHeader;