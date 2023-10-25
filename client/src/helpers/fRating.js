import { AntDesign } from "@expo/vector-icons";

export const generateStars = (count) => {
  const stars = [];
  for (let i = 1; i <= count; i++) {
    stars.push(<AntDesign name="star" key={i} size={10} color="#F8B84E" />);
  }
  return stars;
};
