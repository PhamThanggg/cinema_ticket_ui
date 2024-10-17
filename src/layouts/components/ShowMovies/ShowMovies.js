import classNames from 'classnames/bind';
import styles from './ShowMovies.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Typpy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { GetAreaApi } from '~/service/AreaService';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function ShowMovies({ children, onAreaChange }) {
    const location = useLocation();
    const path = location.pathname;

    const [activeTab, setActiveTab] = useState(path === '/showing' ? 'showing' : 'comming');
    const [selectedArea, setSelectedArea] = useState('Toàn quốc');
    const [visible, setVisible] = useState(false);
    const [area, setArea] = useState(null);

    useEffect(() => {
        if (path === '/showing') {
            setActiveTab('showing');
        } else if (path === '/coming-soon') {
            setActiveTab('comming');
        }
    }, [path]);

    useEffect(() => {
        const storedArea = sessionStorage.getItem('selectedArea');
        if (storedArea) {
            const { name } = JSON.parse(storedArea);
            setSelectedArea(name);
        }
    }, []);

    const handleToggle = () => {
        setVisible(!visible);
    };

    const handleSelectArea = (item) => {
        setSelectedArea(item.areaName);
        if (item.id === null) {
            sessionStorage.removeItem('selectedArea');
            onAreaChange(null);
        } else {
            sessionStorage.setItem('selectedArea', JSON.stringify({ id: item.id, name: item.areaName }));
            onAreaChange(item.id);
        }
        setVisible(false);
    };

    useEffect(() => {
        getArea();
    }, []);

    const getArea = async () => {
        try {
            const data = await GetAreaApi();
            if (data && data.result) {
                setArea(data.result);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    if (!area) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('title')}>PHIM</div>
                <div className={cx('nac_item')}>
                    <Link className={cx('showing', activeTab === 'showing' && 'tab__active')} to="/showing">
                        Đang chiếu
                    </Link>
                    <Link className={cx('comming', activeTab === 'comming' && 'tab__active')} to="/coming-soon">
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
                                    <li
                                        className={cx('menu-item')}
                                        onClick={() => handleSelectArea({ id: null, areaName: 'Toàn quốc' })}
                                    >
                                        <Link
                                            to="#"
                                            className={cx('menu-link', {
                                                selected: selectedArea === 'Toàn quốc',
                                            })}
                                        >
                                            Toàn quốc
                                        </Link>
                                    </li>
                                    {area.map((item) => (
                                        <li
                                            key={item.id}
                                            className={cx('menu-item')}
                                            onClick={() => handleSelectArea(item)}
                                        >
                                            <Link
                                                to={item.link}
                                                className={cx('menu-link', {
                                                    selected: selectedArea === item.areaName,
                                                })}
                                            >
                                                {item.areaName}
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

            {children}
        </div>
    );
}

export default ShowMovies;
