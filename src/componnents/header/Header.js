import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions';
import userIcon from './user_icon.png';

const Header = () => {
  const logged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <header className="chat-app__header">
      <div className="wrapper">
        <h1>Final task: RSS Chat</h1>
        {
          logged.status ?
            <div className="user">
              <div className="user__img">
                <img src={userIcon} alt="user avatar"/>
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