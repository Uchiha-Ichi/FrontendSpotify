import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import NavBar from '../Components/NavBar/NavBar.jsx';
import Player from '../Components/Player/Player.jsx';
import SideBar from '../Components/SideBar/SideBar.jsx';
const MainLayout = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Player />
      {/* <footer className={styles.footer}>Footer Content</footer> */}
    </>
  );
};

export default MainLayout;
