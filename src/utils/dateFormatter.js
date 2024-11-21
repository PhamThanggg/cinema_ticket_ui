export function formatDateToCustomFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 0 nếu tháng < 10
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatToApiDateTime(dateTime) {
    if (dateTime.length > 16) {
        return dateTime.replace('T', ' ');
    }
    return dateTime.replace('T', ' ') + ':00';
}

export function formatToApiTime(dateTime) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function formatDateTime(datee, time) {
    return `${datee} ${time}:00`;
}
