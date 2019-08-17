import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, join} from '../../redux/actions';
import Logo from "../logo/logo";

const Header = () => {
  const logged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <header className="chat-app__header">
      <div className="wrapper wrapper_block">
      <h1 className="visually-hidden">Rolling scopes school chat</h1>
      <Logo className="header__title" handleClick={() => dispatch(join())}/>
        {
          logged.status ?
            <div className="user">
              <div className="user__img">
                <img src="" alt="user avatar"/>
              </div>
              <span className="user__name">{logged.userName}</span>
              <button className="user__logout button_sign" onClick={() => dispatch(logOut())}>Sign out</button>
            </div>
            :
            null
        }
      </div>
    </header>
  )
};

export default Header;