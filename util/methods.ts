import * as FileSystem from "expo-file-system";

export default function timestampToDate(timestamp: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
export function timestampToDateShort(timestamp: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}
export function getMonthAbbreviation(timestamp:number) {
  const date = new Date(timestamp);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[date.getMonth()];
}
export function getDayOfMonth(timestamp:number) {
  const date = new Date(timestamp);
  return date.getDate();
}

export function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
export function getDayOfWeek(timestamp:number) {
  const date = new Date(timestamp);
  const dayIndex = date.getDay();

  const daysOfWeek = [
    "Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"
  ];

  return daysOfWeek[dayIndex];
}
export function getPlangeriStatusColor(status: string) {
  switch (status) {
    case "In lucru":
      return "#ffbf00";
    case "Neabordata":
      return "red";
    case "Finalizata":
      return "#009c4a";
    default:
      return "white"; 
  }
}
export const convertImageToBase64 = async (uri: string) => {
  try {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64String;
  } catch (error) {
    console.error("Failed to convert image to base64:", error);
    throw error;
  }
};
