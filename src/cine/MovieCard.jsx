/* eslint-disable react/prop-types */
import Tag from "../assets/tag.svg";
import { MovieContext } from "../context";
import { getImageUrl } from "../utils/cardUtility";
import MovieDetailsModal from "./MovieDetailsModal";
import Ratings from "./Ratings";
import { useState, useContext } from "react";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const imageUrl = getImageUrl(movie.cover);
  const { state, dispatch } = useContext(MovieContext);

  const handleAddToCart = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    const found = state.cartData.find((item) => item.id === movie.id);
    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...movie },
      });
      toast.success(`The movie ${movie.title} has been added to the cart`, {
        position:"bottom-right",
      });
    } else {
      toast.error(`The movie ${movie.title} has been already added to the cart`, {
        position:"bottom-right",
      });
    }
  };

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <MovieDetailsModal
          onAdd={handleAddToCart}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a
          onClick={() => {
            handleShowModal(movie);
          }}
          href="#"
        >
          <img className="w-full object-cover" src={imageUrl} alt="" />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Ratings value={movie.rating} />
            </div>
            <a
              onClick={(e) => handleAddToCart(e, movie)}
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
            >
              <img src={Tag} alt="" />
              <span>${movie.price} | Add to Cart</span>
            </a>
          </figcaption>
        </a>
      </figure>
    </>
  );
};

export default MovieCard;
