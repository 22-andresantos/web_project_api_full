import ImagePopup from '../../Popup/ImagePopup/ImagePopup.jsx';

export default function Card(props) {
  // const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = props.card;
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
    isImagePopup: true,
  };

  // Muda a classe do botão de like dependendo se o card já foi curtido ou não
  const cardLikeButtonClassName = `button__like ${isLiked ? `button__like_active` : ''}`;

  // Deletar card
  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className='card'>
      <img
        className='card__img'
        src={link}
        alt='Card Image'
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <h2 className='card__title'>{name}</h2>

      <button
        className={cardLikeButtonClassName}
        aria-label='Like Card'
        type='button'
        onClick={handleLikeClick}
      ></button>

      <button
        className='button__remove-card'
        aria-label='Remove Card'
        type='button'
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
