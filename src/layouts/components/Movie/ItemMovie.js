import classNames from 'classnames/bind';
import styles from './ItemMovie.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function ItemMovie({ showBuyTicketButton, movieId = 10 }) {
    const [showTrailer, setShowTrailer] = useState(false);

    const handlePlayTrailer = () => {
        setShowTrailer(true);
    };

    const handleCloseTrailer = () => {
        setShowTrailer(false);
    };

    const navigate = useNavigate();

    const handleBuyTicketClick = (e) => {
        e.stopPropagation();

        navigate('/Movie-detail', { state: { movieId } });
    };

    return (
        <div className={cw('col', 'pc-3', 't-6', 'm-12')}>
            <div className={cx('wrapper-item', 'margin-rsp')}>
                <div className={cx('item-link')} onClick={handlePlayTrailer}>
                    <div className={cx('ctn-image')}>
                        <img
                            className={cx('image')}
                            src="https://bhdstar.vn/wp-content/uploads/2024/08/referenceSchemeHeadOfficeallowPlaceHoldertrueheight700ldapp-22.jpg"
                            alt="Name"
                        ></img>
                        <div className={cx('img-hover')}>
                            <FontAwesomeIcon className={cx('play')} icon={faCirclePlay} />
                            {showBuyTicketButton && (
                                <Button primary className={cx('buy-ticket')} onClick={handleBuyTicketClick}>
                                    Mua vé ngay
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={cx('meta')}>
                        <span className={cx('age-limit', 'T18')}>T18</span>
                        <span className={cx('format')}>2D</span>
                    </div>
                    <h4 className={cx('title')}>
                        <span className={cx('tooltip')}>Longlegs: THẢM Kịch dị giáo THẢM K THẢM K THẢM K</span>
                    </h4>
                </div>
                <div className={cx('cats')}>
                    Thể loại phim:
                    <span className={cx('movie-type')}>Crime</span>
                </div>
                {showTrailer && (
                    <div className={cx('trailer-popup')} onClick={handleCloseTrailer}>
                        <div className={cx('trailer-container')} onClick={(e) => e.stopPropagation()}>
                            <iframe
                                width="1080"
                                height="480"
                                src={'https://www.youtube.com/embed/EjnPaUaWeWg'}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <button onClick={handleCloseTrailer} className={cx('close-trailer')}>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemMovie;
