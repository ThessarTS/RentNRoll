export const getStatusBackgroundColor = (status) => {
  if (status === "returned") return "green";
  else if (status === "ongoing") return "#17799A";
  else return "#FF6347";
};
