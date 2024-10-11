import images from '~/assets/image';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <img className={cx('img')} src={images.loadingg} alt="Loading..." />
                <div className={cx('txt')}>Chờ xíu nhé...</div>
                <div style={{ height: '100px' }}></div>
            </div>
        </div>
    );
}

export default Loading;
