export default function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <li className="popup__img-container">
      <img className="popup__img-src" src={link} alt="Card Image" />

      <h2 className="popup__img-title">{name}</h2>
    </li>
  );
}
