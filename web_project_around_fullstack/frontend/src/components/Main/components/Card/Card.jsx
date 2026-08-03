import { useContext } from "react";

import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";

import ImagePopup from "../../Popup/ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;

  const { name, link, likes } = props.card;

  const imageComponent = {
    children: <ImagePopup card={props.card} />,
    isImagePopup: true,
  };

  // Muda a classe do botão de like dependendo se o card já foi curtido ou não
  const isLiked = Array.isArray(likes)
    ? likes.some((id) => id === currentUser._id)
    : false;

  const cardLikeButtonClassName = `button__like ${isLiked ? "button__like_active" : ""}`;

  // Deletar card
  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__img"
        src={link}
        alt="Card Image"
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <h2 className="card__title">{name}</h2>

      <button
        className={cardLikeButtonClassName}
        aria-label="Like Card"
        type="button"
        onClick={handleLikeClick}
      ></button>

      <button
        className="button__remove-card"
        aria-label="Remove Card"
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
