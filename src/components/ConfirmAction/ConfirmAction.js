import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmAction = async (title, text) => {
    const result = await MySwal.fire({
        title: title || 'Bạn có chắc chắn không?',
        text: text || 'Bạn thực sự muốn thực hiện hành động này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Không!',
    });

    return result.isConfirmed;
};
