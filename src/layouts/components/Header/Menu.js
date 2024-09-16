import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import Typpy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

import Account from './Account';

const cx = classNames.bind(styles);

function Menu({ children }) {
    const [visible, setVisible] = useState(false);
    const dropMenuRef = useRef(null);

    const handleToggle = () => {
        setVisible((prev) => !prev);
    };

    const handleToggleOutSide = () => {
        dropMenuRef.current.style.transform = 'translateX(300px)';
        dropMenuRef.current.style.transition = 'transform 0.5s ease';
        const timer = setTimeout(() => {
            setVisible(false);
        }, 200);

        return () => clearTimeout(timer);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (dropMenuRef.current) {
                if (visible) {
                    dropMenuRef.current.style.transform = 'translateX(0)';
                } else {
                    dropMenuRef.current.style.transform = 'translateX(300px)';
                }
            }
        }, 30);

        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <div>
            <Typpy
                interactive
                visible={visible}
                offset={[200, 0]}
                onClickOutside={handleToggleOutSide}
                appendTo="parent"
                render={(attrs) => (
                    <div ref={dropMenuRef} className={cx('drop-menu')} tabIndex="-1" {...attrs}>
                        <span className={cx('exit-display')} onClick={handleToggleOutSide}>
                            {<FontAwesomeIcon className={cx('icon-menu-rsp')} icon={faTimes} />}
                        </span>
                        <div className={cx('wrapper-search-rsp')}>
                            <div className={cx('search-rsp')}>
                                <FontAwesomeIcon className={cx('search-icon-rsp')} icon={faSearch} />
                                <input className={cx('search-input-rsp')} placeholder="Tìm kiếm" />
                            </div>
                        </div>
                        <div className={cx('acc')}>
                            <Account offset={true} />
                        </div>
                        <ul className={cx('menu-list')}>{children}</ul>
                    </div>
                )}
            >
                <div>
                    <button className={cx('navbar-toggler', 'collapsed')} onClick={() => handleToggle()}>
                        <span className={cx('menu-display', visible ? 'active-button' : '')}>
                            {<FontAwesomeIcon icon={faBars} className={cx('icon-menu-open')} />}
                        </span>
                    </button>
                </div>
            </Typpy>
            <div className={cx('wrapper-dark', visible && 'show')}></div>
        </div>
    );
}

export default Menu;
