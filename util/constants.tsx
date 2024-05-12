export const DUMMY_EVENT = [
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
  {
    image: "./photos/images.jpg",
    data: 1712155946,
    titlu: "Stand-up Comedy",
  },
];
export const dummyComments = [
  {
    authorEmail: "tudorgiu@gmail.com",
    author: "John Doe",
    date: new Date().getTime(), // Current timestamp
    message: "This is a comment message 1",
  },
  {
    authorEmail: "tudorgiu@gmail.com",
    author: "Jane Smith",
    date: new Date().getTime(), // Current timestamp
    message: "This is a comment message 2",
  },
  {
    authorEmail: "tudorgiu@gmail.com",
    author: "Alice Johnson",
    date: new Date().getTime(), // Current timestamp
    message: "This is a comment message 3",
  },
  {
    authorEmail: "tudorgiu@gmail.com",
    author: "Bob Brown",
    date: new Date().getTime(), // Current timestamp
    message: "This is a comment message 4",
  },
  // Add more dummy data objects as needed
];

export const TIMISOARA = {
  latitude: 45.7538355,
  longitude: 21.2257474,
  longitudeDelta: 0.08,
  latitudeDelta: 0.08,
};
export const REQUESTS = [
  {
    _id: "662fc77ef266aafead0fcd9d",
    acountName: "Florin",
    acountId: "5553",
    date: 1714407294323,
    status: "PENDING",
  },
  {
    _id: "662fc77ef266aafead0fcd9e",
    acountName: "Maria",
    acountId: "5554",
    date: 1714407294324,
    status: "APPROVED",
  },
  {
    _id: "662fc77ef266aafead0fcd9f",
    acountName: "John",
    acountId: "5555",
    date: 1714407294325,
    status: "REJECTED",
  },
  {
    _id: "662fc77ef266aafead0fcd90",
    acountName: "Sophia",
    acountId: "5556",
    date: 1714407294326,
    status: "PENDING",
  },
  {
    _id: "662fc77ef266aafead0fcd91",
    acountName: "Ethan",
    acountId: "5557",
    date: 1714407294327,
    status: "COMPLETED",
  },
];
export const STATUS_UTILIZATOR = ["Utilizator", "Creator", "Primarire"];
export function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "yellow";
    case "ACCEPTED":
      return "green";
    case "REJECTED":
      return "red";
    default:
      return "white";
  }
}

export const ButtonTypes = [
  "Upcoming",
  "Divertisment",
  "Culturale",
  "Conferinte",
];
export const API_KEY = "AIzaSyB7pHjqFGroA6xaKMHNdTdIGz14psqe-7o";
export const BACKEND_LINK = "http://192.168.0.127:3000";
export const TIMISOARA_POLIGON = [
  { latitude: 45.696647, longitude: 21.210255 },
  { latitude: 45.568183, longitude: 21.202198  },
  { latitude: 45.605776, longitude: 20.976583  },
  { latitude: 45.897016, longitude: 21.021706  },
  { latitude: 45.902997, longitude:21.223148  },
  { latitude:45.780041, longitude:21.213412  },
  { latitude: 45.776652, longitude:21.204578 },
  { latitude: 45.775850, longitude:21.199006 },
  { latitude: 45.773746, longitude:21.197097 },
  { latitude: 45.771599, longitude:21.196358 },
  { latitude: 45.772372, longitude:21.193218 },
  { latitude: 45.770568, longitude:21.192048 },
  { latitude: 45.768936, longitude:21.194018 },
  { latitude: 45.766316, longitude:21.190509 },
  { latitude: 45.763801, longitude:21.179128 },
  { latitude: 45.747484, longitude:21.183572 },
  { latitude: 45.749398, longitude:21.183890 },
  { latitude: 45.747005, longitude:21.188606 },
  { latitude: 45.743721, longitude:21.187079 },
  { latitude:45.739959, longitude:21.175500 },
  { latitude:45.726149, longitude:21.169238 },
  { latitude: 45.720191, longitude:21.161024 },
  { latitude:45.714922, longitude:21.167166 },
  { latitude:45.722478, longitude:21.187401 },
  { latitude: 45.719324, longitude:21.192526 },
  { latitude: 45.717840, longitude:21.187250 },
  { latitude: 45.711161, longitude:21.189755 },
  { latitude: 45.695038, longitude:21.172037 },
  { latitude: 45.693579, longitude:21.188020 },
  { latitude: 45.699958, longitude:21.193696 },
  { latitude: 45.698045, longitude:21.204264 }, 
];

export const TIMISOARA_POLIGON2 = [
  { latitude: 45.696647, longitude: 21.210255 },
  { latitude: 45.568183, longitude: 21.202198  },
  { latitude: 45.578216, longitude: 21.496538 },
  { latitude: 45.950820, longitude: 21.487691 },
  { latitude: 45.902997, longitude:21.223148  },
  { latitude:45.780041, longitude:21.213412  },
  { latitude:45.783005, longitude:21.218703  },
  { latitude:45.781141, longitude:21.245207  },
  { latitude:45.778553, longitude:21.252005  },
  { latitude:45.781814, longitude:21.257681  },
  { latitude:45.775381, longitude:21.265201  },
  { latitude:45.772824, longitude:21.258022  },
  { latitude:45.768730, longitude:21.260839  },
  { latitude:45.769082, longitude:21.267036  },
  { latitude:45.764149, longitude:21.269697  },
  { latitude:45.763938, longitude:21.275184  },
  { latitude:45.753310, longitude:21.271866  },
  { latitude:45.744799, longitude:21.266987  },
  { latitude:45.736601, longitude:21.260633  },
  { latitude:45.727983, longitude:21.278884  },
  { latitude:45.721081, longitude:21.277892  },
  { latitude:45.715189, longitude:21.261717  },
  { latitude:45.721027, longitude:21.245932  },
  { latitude:45.720733, longitude:21.224887  },
  { latitude:45.711622, longitude:21.223481  },
  { latitude:45.711240, longitude:21.214417 },
  { latitude:45.711076, longitude:21.205118 },
  
]

