import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './MovieBooking.module.scss';
import classNames from 'classnames/bind';
import Item from './Item';

const cx = classNames.bind(styles);

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className={cx('slick-prev')} onClick={onClick}>
            &lt;
        </button>
    );
};

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className={cx('slick-next')} onClick={onClick}>
            &gt;
        </button>
    );
};

function MovieBooking({ movieData, handleSelectMovie, selectedIndex }) {
    const settings = {
        className: 'center',
        centerMode: true,
        dots: true, // Hiển thị các chấm tròn để chuyển ảnh
        infinite: true, // Cho phép vòng lặp lại slider
        speed: 500, // Tốc độ chuyển ảnh
        slidesToShow: 4, // Số ảnh hiển thị mỗi lần
        slidesToScroll: 1, // Số ảnh cuộn mỗi lần
        autoplay: false, // Tự động chuyển ảnh
        autoplaySpeed: 4000, // Thời gian giữa các lần chuyển ảnh (3000ms = 3 giây)
        centerPadding: '-13px',
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1239,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '-35px',
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '-37px',
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '0px',
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                {movieData && movieData.length > 0 ? (
                    <Slider {...settings}>
                        {movieData.map((data, index) => (
                            <div key={index} onClick={() => handleSelectMovie(index, data)}>
                                <Item isSelected={selectedIndex === index} data={data} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default MovieBooking;
