/* eslint-disable react/prop-types */
import Star from "../assets/star.svg";
const Ratings = ({ value }) => {
  const ratings = Array(value).fill(Star);
  return (
    <>
      {ratings.map((rating, index) => (
        <img key={index} src={rating} width="14" height="14" alt="" />
      ))}
    </>
  );
};

export default Ratings;
