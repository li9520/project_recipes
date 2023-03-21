import React from 'react';

import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.mainContainer}>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
