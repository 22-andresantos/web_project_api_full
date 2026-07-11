import logo from '../../images/logo.png';
import line from '../../images/line.png';

export default function Header({ children }) {
  return (
    <header className='header'>
      <div className='header__top'>
        <img src={logo} alt='Around The US Logo' className='header__logo' />

        {children}
      </div>

      <img src={line} alt='Line Image' className='header__line' />
    </header>
  );
}
