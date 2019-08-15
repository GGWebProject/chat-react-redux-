import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions';

const Header = () => {
  const logged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <header>
      <h1>Final task: RSS Chat</h1>
      {
        logged.status ?
          <div className="user">
            <span className="user__name">User: {logged.userName}</span>
            <button className="user__logout" onClick={() => dispatch(logOut())}>logOut</button>
          </div>
          :
          null
      }
    </header>
  )
};

export default Header;