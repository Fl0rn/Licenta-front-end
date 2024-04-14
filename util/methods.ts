export default function timestampToDate(timestamp:number) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(timestamp * 1000); 
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} ${month}`;
}