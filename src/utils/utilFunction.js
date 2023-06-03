export const convertToTime = (num)=>{
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}
export const isNumber = (value)=>{
  return typeof value === "number";
}