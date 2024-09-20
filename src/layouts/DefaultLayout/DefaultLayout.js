import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Login from '~/layouts/components/AuthDialog/Login';
import Register from '~/layouts/components/AuthDialog/Register';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLoginClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setIsLogin(true);
    };

    return (
        <div className={cx('wrapper')}>
            <Header onLoginClick={handleLoginClick} />
            {isLogin ? (
                <Login open={isDialogOpen} handleClose={handleCloseDialog} handleRegister={toggleForm} />
            ) : (
                <Register open={isDialogOpen} handleClose={handleCloseDialog} handleLogin={toggleForm} />
            )}
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
