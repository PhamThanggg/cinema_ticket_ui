import classNames from 'classnames/bind';
import styles from './ShowMovies.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NowShowing from './NowShowing';
import CommingSoon from './CommingSoon';
import Typpy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ShowMovies() {
    const [activeTab, setActiveTab] = useState('showing');
    const [selectedArea, setSelectedArea] = useState('Khu vực');
    const [visible, setVisible] = useState(false);

    const areas = [{ name: 'Thái Bình' }, { name: 'Hà Nội' }];
    const handleToggle = () => {
        setVisible(!visible);
    };

    const handleSelectArea = (areaName) => {
        setSelectedArea(areaName);
        setVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('title')}>PHIM</div>
                <div className={cx('nac_item')}>
                    <Link
                        className={cx('showing', activeTab === 'showing' && 'tab__active')}
                        onClick={() => setActiveTab('showing')}
                    >
                        Đang chiếu
                    </Link>
                    <Link
                        className={cx('comming', activeTab === 'comming' && 'tab__active')}
                        onClick={() => setActiveTab('comming')}
                    >
                        Sắp chiếu
                    </Link>
                    <Typpy
                        interactive={true}
                        hideOnClick={true}
                        visible={visible}
                        delay={[0, 0]}
                        offset={[90, 0]}
                        touch={true}
                        placement={'bottom-end'}
                        onClickOutside={() => setVisible(false)}
                        render={(attrs) => (
                            <div className={cx('dropdown-menu')} tabIndex="-1" {...attrs}>
                                <ul className={cx('menu-list-respon')}>
                                    {areas.map((item, index) => (
                                        <li
                                            key={index}
                                            className={cx('menu-item')}
                                            onClick={() => handleSelectArea(item.name)}
                                        >
                                            <Link
                                                to={item.link}
                                                className={cx('menu-link', { selected: selectedArea === item.name })}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    >
                        <div className={cx('area', { selected: selectedArea !== 'Khu vực' })} onClick={handleToggle}>
                            <FontAwesomeIcon icon={faLocation} style={{ marginRight: '4px' }} />
                            {selectedArea}
                        </div>
                    </Typpy>
                </div>
            </div>

            {/* firm */}
            {activeTab === 'showing' && <NowShowing />}
            {activeTab === 'comming' && <CommingSoon />}
        </div>
    );
}

export default ShowMovies;
