import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import BookTicket from '~/layouts/components/BookTicket';
import { GetAreaApi } from '~/service/AreaService';

function Booking() {
    const [area, setArea] = useState(null);

    useEffect(() => {
        getArea();
    }, []);

    const getArea = async () => {
        const data = await GetAreaApi();

        if (data && data.result) {
            setArea(data.result);
        }
    };

    if (!area) {
        return <Loading />;
    }
    return (
        <div>
            <BookTicket dataArea={area} />
        </div>
    );
}

export default Booking;
