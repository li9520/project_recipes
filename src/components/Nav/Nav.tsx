import React from 'react';

import { observer } from 'mobx-react-lite';
import { AiFillHeart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import favouriteStore from 'store/FavouriteStore/instance';

import styles from './Nav.module.scss';

const Nav = () => {
  const { data } = favouriteStore;
  return (
    <div className={styles.nav}>
      <div className={styles.nav_container}>
        <NavLink to="/" className={({ isActive }) => `${isActive ? styles.active : ''}`}>
          HOME
        </NavLink>
        <NavLink to="favourite" className={({ isActive }) => `${isActive ? styles.active : ''}`}>
          <span className={styles.text}>FAVOURITE</span>
          <div className={styles.counter}>
            <AiFillHeart />
            <div className={styles.counter_number}>{data.length > 99 ? '99+' : data.length}</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default observer(Nav);
