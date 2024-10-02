import classNames from 'classnames/bind';
import styles from './CommingSoon.module.scss';
import styleGrid from '~/components/GlobalStyles/Grid.module.scss';
import ItemMovie from '~/layouts/components/Movie/ItemMovie';

const cx = classNames.bind(styles);
const cw = classNames.bind(styleGrid);

function CommingSoon() {
    return (
        <div className={cx('wrapper')}>
            <div className={cw('grid', 'wide')}>
                <div className={cx('ctn')}>
                    <div className={cw('row')}>
                        <ItemMovie showBuyTicketButton={false} />
                        <ItemMovie showBuyTicketButton={false} />
                        <ItemMovie showBuyTicketButton={false} />
                        <ItemMovie showBuyTicketButton={false} />
                        <ItemMovie showBuyTicketButton={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommingSoon;
