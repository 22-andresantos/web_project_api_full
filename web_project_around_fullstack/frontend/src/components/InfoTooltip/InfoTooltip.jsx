import Popup from '../Main/Popup/Popup';

import successIcon from '../../images/successIcon.png';
import failIcon from '../../images/failIcon.png';

export default function InfoTooltip({ isOpen, onClose, success }) {
  if (!isOpen) return null;

  return (
    <Popup onClose={onClose} isTooltipPopup={true}>
      <div className='tooltip'>
        <img
          className='tooltip__icon'
          src={success ? successIcon : failIcon}
          alt='Status'
        />

        <h2 className='tooltip__message'>
          {success
            ? 'Vitória! Agora você está registrado.'
            : 'Ops, algo deu errado. Tente novamente.'}
        </h2>
      </div>
    </Popup>
  );
}
