import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import AdminHeader from '~/layouts/admin/AdminHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function DefaultLayoutAdmin({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <AdminHeader toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
            <div className={cx('container', { active: !isSidebarVisible })}>
                <div className={cx('content')}>{children}</div>
            </div>
            <ToastContainer
                style={{ marginTop: '40px' }}
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default DefaultLayoutAdmin;
