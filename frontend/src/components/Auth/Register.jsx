import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    onRegister({ email, password });
  }

  return (
    <>
      <Header>
        <Link to='/signin' className='header__link'>
          Faça o login
        </Link>
      </Header>

      <section className='auth'>
        <h2 className='auth__title'>Inscrever-se</h2>

        <form className='auth__form' onSubmit={handleSubmit}>
          <input
            className='auth__input'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Inscrever-se
          </button>
        </form>

        <p className='auth__text'>
          Já é um membro?{' '}
          <Link to='/signin' className='auth__link'>
            Faça o login aqui
          </Link>
        </p>
      </section>
    </>
  );
}
