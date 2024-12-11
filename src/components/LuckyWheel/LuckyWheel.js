import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import classNames from 'classnames/bind';
import styles from './LuckyWheel.module.scss';

const cx = classNames.bind(styles);

const data = [
    {
        image: {
            uri: 'https://images.ctfassets.net/vhp9jnid12wf/1LpNg2HgsR92tSd6UFl49L/b6246fc291865f90fda6dc37ea553a07/game.png',
            landscape: true,
            sizeMultiplier: 0.75,
            offsetX: 0,
        },
        style: {
            height: 48,
        },
    },
    {
        option: '7-day free trial',
    },
    {
        image: {
            uri: 'https://images.ctfassets.net/vhp9jnid12wf/5JTVGwAj0qhtvfoyaigZP2/5de37d1887f91e8492a77b1745f2d563/boxing-gloves.png',
            landscape: true,
            sizeMultiplier: 0.75,
            offsetX: 0,
        },
        style: {
            height: 48,
        },
    },
    {
        option: '1 month free',
    },
    {
        image: {
            uri: 'https://images.ctfassets.net/vhp9jnid12wf/7h6RcUFyE0fsF932oglivQ/2e3550131d35015b51569f1d8f55501a/football-ticket.png',
            landscape: true,
            sizeMultiplier: 0.75,
            offsetX: 0,
        },
        style: {
            height: 48,
        },
    },
    {
        option: 'Next time!',
    },
];

const LuckyWheel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const element = document.querySelector('.sc-gsTCUz');
    if (element) {
        element.style.visibility = 'visible';
    }
    useEffect(() => {}, []);

    return (
        <div className={cx('wheel-container')}>
            <h1>🎉 Vòng Quay May Mắn 🎉</h1>
            <Wheel
                style={{ visibility: 'visible' }}
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                outerBorderColor={'#fff'}
                outerBorderWidth={10}
                radiusLineColor={'#fff'}
                radiusLineWidth={2}
                textColors={['#fff']}
                backgroundColors={['#165FA9', '#239b63', '#F7A415', '#3F297E', '#BE1080', '#DC0836']}
                onStopSpinning={() => {
                    setMustSpin(false);
                    alert(`🎉 Bạn đã trúng: ${data[prizeNumber].option || 'Phần thưởng'}!`);
                }}
            />
            <button className={cx('spin-button')} onClick={handleSpinClick}>
                QUAY NGAY!
            </button>
        </div>
    );
};

export default LuckyWheel;
