import classNames from 'classnames/bind';
import styles from './ShowMovies.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetAreaApi } from '~/service/AreaService';
import Loading from '~/components/Loading';
import DropDownSearch from '~/components/DropDownSearch';
import { GetGenreApi } from '~/service/GenreService';

const cx = classNames.bind(styles);

function ShowMovies({ children, onAreaChange }) {
    const location = useLocation();
    const path = location.pathname;

    const [activeTab, setActiveTab] = useState(path === '/showing' ? 'showing' : 'comming');
    const [area, setArea] = useState([]);
    const [genre, setGenre] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (path === '/showing') {
            setActiveTab('showing');
        } else if (path === '/coming-soon') {
            setActiveTab('comming');
        }
    }, [path]);

    useEffect(() => {
        const getArea = async () => {
            const res = await GetAreaApi();
            if (res && res.result) {
                const data = res.result.map((item) => ({
                    value: item.id,
                    name: item.areaName,
                }));
                setArea(data);
            }
        };

        const getGenre = async () => {
            const res = await GetGenreApi();
            if (res && res.result) {
                const data = res.result.map((item) => ({
                    value: item.id,
                    name: item.name,
                }));
                setGenre(data);
            }
        };

        setLoading(true);
        getArea();
        getGenre();
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div className={cx('nav-type')}>
                    <div className={cx('title')}>PHIM</div>
                    <div className={cx('nac_item')}>
                        <Link className={cx('showing', activeTab === 'showing' && 'tab__active')} to="/showing">
                            Đang chiếu
                        </Link>
                        <Link className={cx('comming', activeTab === 'comming' && 'tab__active')} to="/coming-soon">
                            Sắp chiếu
                        </Link>
                    </div>
                </div>

                <div className={cx('ctn-search')}>
                    <DropDownSearch searchName={'Chọn khu vực'} data={area} name={'areaId'} />
                    <DropDownSearch searchName={'Chọn thể loại'} data={genre} name={'genreId'} />
                </div>
            </div>

            {children}
        </div>
    );
}

export default ShowMovies;
