import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

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

function MovieBooking() {
    const images = [1, 2, 3, 4, 5, 6];

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

    const [selectedIndex, setSelectedIndex] = useState(null); // State để quản lý chỉ mục được chọn

    const handleItemClick = (index) => {
        setSelectedIndex(index); // Cập nhật chỉ mục được chọn
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <Slider {...settings}>
                    {/* {images.map((image, index) => (
                        <Item key={index} />
                    ))} */}
                    {images.map((image, index) => (
                        <div key={index} onClick={() => handleItemClick(index)}>
                            <Item isSelected={selectedIndex === index} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default MovieBooking;
