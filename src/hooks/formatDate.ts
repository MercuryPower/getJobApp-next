export const formattedDate = (dateString:string, onlyYear?:boolean) => {
    const date = new Date(dateString);
    const months = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if (onlyYear) {
        const year = date.getFullYear();
        return `${year} `;
    } else {
        return `${day} ${month} в ${hours}:${minutes} `;
    }
};
