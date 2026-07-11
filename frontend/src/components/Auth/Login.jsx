import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default function Login({ onLogin }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email: userEmail, password });
  }

  return (
    <>
      <Header>
        <Link to='/signin' className='header__link'>
          Entrar
        </Link>
      </Header>

      <section className='auth'>
        <h2 className='auth__title'>Entrar</h2>

        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            className='auth__input'
            type='email'
            placeholder='Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <input
            className='auth__input'
            type='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type='submit' className='auth__button'>
            Entrar
          </button>
        </form>

        <p className='auth__text'>
          Ainda não é um membro?{' '}
          <Link to='/signup' className='auth__link'>
            Inscreva-se aqui
          </Link>
        </p>
      </section>
    </>
  );
}
