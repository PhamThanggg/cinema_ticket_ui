import { useState, useEffect } from 'react';
import { useAuth } from '~/components/Context/AuthContext';
import ProfileInfo from '~/layouts/components/ProfileInfo';
import { GetInvoiceApi } from '~/service/InvocieService';

function Profile() {
    const { state } = useAuth();
    const { token } = state;
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        const getSeatSelect = async () => {
            const data = await GetInvoiceApi(0, 5, token);

            if (data && data.result) {
                setInvoice(data.result);
            }
        };

        getSeatSelect();
    }, []);

    return (
        <div>
            <ProfileInfo invoiceData={invoice} />
        </div>
    );
}

export default Profile;
