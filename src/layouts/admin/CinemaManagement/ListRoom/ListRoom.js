import { useLocation } from 'react-router-dom';

function ListRoom() {
    const location = useLocation();
    const { id } = location.state || {};
    return (
        <div>
            <div>ListRoom</div>
        </div>
    );
}

export default ListRoom;
