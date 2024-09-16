import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Typpy from '@tippyjs/react/headless';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function DropdownMenu({ items, buttonText, offset }) {
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
        setVisible(!visible);
    };

    return (
        <Typpy
            interactive={true}
            hideOnClick={false}
            delay={[0, 0]}
            offset={offset ? [100, -10] : [0, 0]}
            touch={true}
            placement={'bottom-end'}
            onClickOutside={() => setVisible(false)}
            onShow={() => setVisible(true)}
            onHide={() => setVisible(false)}
            render={(attrs) => (
                <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                    <ul className={cx('menu-list-respon')}>
                        {items.map((item, index) => (
                            <li key={index} className={cx('menu-item')}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        >
            <div>
                <Button
                    text
                    iconCss
                    className={visible ? 'active-button' : ''}
                    onClick={handleToggle}
                    rightIcon={<FontAwesomeIcon className={cx('icon-menu')} icon={faAngleDown} />}
                >
                    {buttonText}
                </Button>
            </div>
        </Typpy>
    );
}

export default DropdownMenu;
