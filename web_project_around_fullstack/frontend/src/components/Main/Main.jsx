import { useContext } from 'react';

import button_edit from '../../images/button_avatar.png';
import button_card from '../../images/button_card.png';
import NewCard from './Popup/NewCard/NewCard.jsx';
import EditAvatar from './Popup/EditAvatar/EditAvatar.jsx';
import EditProfile from './Popup/EditProfile/EditProfile.jsx';
import Card from '../Main/components/Card/Card.jsx';
import Popup from './Popup/Popup.jsx';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  popup,
  onOpenPopup,
  onClosePopup,
}) {
  const { currentUser, handleUpdateUser, handleUpdateAvatar } =
    useContext(CurrentUserContext);

  const newCardPopup = {
    title: 'New card',
    children: <NewCard />,
  };

  const newEditAvatar = {
    title: 'Edit Avatar',
    children: <EditAvatar onUpdateAvatar={handleUpdateAvatar} />,
  };

  const newEditProfile = {
    title: 'Edit Profile',
    children: <EditProfile onUpdateUser={handleUpdateUser} />,
  };

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__overlay'>
          <img
            onClick={() => onOpenPopup(newEditAvatar)}
            src={currentUser.avatar}
            alt='Avatar Image'
            className='profile__image'
          />

          <img
            src={button_edit}
            alt='Button Edit Image'
            className='profile__image-edit'
            type='button'
          />
        </div>
        <div className='profile__info'>
          <h2 className='profile__title'>{currentUser.name}</h2>

          <button
            onClick={() => onOpenPopup(newEditProfile)}
            className=' button__profile-open'
          >
            <img
              className='button__profile-edit'
              src={button_edit}
              alt='Button Open'
              type='button'
            />
          </button>

          <h2 className='profile__subtitle'>{currentUser.about}</h2>
        </div>
        <button
          onClick={() => onOpenPopup(newCardPopup)}
          className='button__profile-add'
        >
          <img
            className='button__profile-card'
            src={button_card}
            alt='Button Open Add Card'
            type='button'
          />
        </button>
      </section>

      {/* Apresentação dos cards  */}
      <ul className='cards'>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={onOpenPopup} /*função abrir imagem*/
            onCardLike={onCardLike} /* função Like no card*/
            onCardDelete={onCardDelete} /* função deletar card*/
          />
        ))}
      </ul>

      {popup && <Popup onClose={onClosePopup} {...popup} />}
    </main>
  );
}
