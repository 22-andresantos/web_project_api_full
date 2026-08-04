import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute.jsx";

import Header from "./src/components/Header/Header.jsx";
import Main from "./src/components/Main/Main.jsx";
import Footer from "./src/components/Footer/Footer.jsx";
import InfoTooltip from "./src/components/InfoTooltip/InfoTooltip.jsx";

import Login from "./src/components/Auth/Login.jsx";
import Register from "./src/components/Auth/Register.jsx";

import * as auth from "./utils/auth.js";

import { api } from "./utils/api.js";
import { CurrentUserContext } from "./src/contexts/CurrentUserContext.js";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwt"));
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // abrir o popup
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // fechar o popup
  function handleClosePopup() {
    setPopup(null);
  }

  // registrar um novo usuário
  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          // Redirecionar para a página de login ou outra página
          setInfoTooltip(true);
          setSuccess(true);
        }
      })
      .catch((err) => {
        setSuccess(false);
        setErrorMessage(err.message);
        setInfoTooltip(true);
      });
  }

  // fechar o InfoTooltip e redirecionar para a página de login
  function handleCloseInfoTooltip() {
    setInfoTooltip(false);

    if (success) {
      navigate("/signin");
    }
  }

  // entrar com um usuário existente
  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          // Redirecionar para a página principal ou outra página
          setLoggedIn(true);
          return auth.checkToken(data.token);
        }
      })
      .then((userData) => {
        setUserEmail(userData.email);
        navigate("/");
      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltip(true);
        console.error(`Erro ao fazer login: ${err}`);
      });
  }

  // sair do usuário
  const handleSignOut = useCallback(() => {
    localStorage.removeItem("jwt");

    setLoggedIn(false);

    setUserEmail("");

    navigate("/signin");
  }, [navigate]);

  // verificar o token jwt e manter o usuário logado
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((data) => {
        setUserEmail(data.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(`Erro ao verificar token: ${err}`);
        handleSignOut();
      });
  }, [handleSignOut]);

  // carregar dados do User
  useEffect(() => {
    if (!loggedIn) return;

    (async () => {
      await api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Erro dos dados do usuário: ${err}`);
        });
    })();
  }, [loggedIn]);

  // carregar dados dos Cards
  useEffect(() => {
    // Executa somente quando o usuário estiver logado
    if (!loggedIn) return;

    (async () => {
      await api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(`Erro dos dados dos cards: ${err}`);
        });
    })();
  }, [loggedIn]);

  // like ou dislike o card
  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    // .map cria um novo array.
    // Se o ID for o mesmo do card clicado, substituímos pelo novo que veio da API.
    // Se não, mantemos o card atual da lista.
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.error);
  }

  // deletar o card
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => console.error(error));
  }

  // manipulador para adicionar Card
  const handleAddPlaceSubmit = (newCardData) => {
    api
      .addNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  // Solicitar via API nome e sobre mim e atualizar o estado do usuário atual
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          console.log(`Erro ao atualizar os dados do usuário: ${err}`);
        });
    })();
  };

  // solicitar via API o link do avatar e atualizar o estado do usuário atual
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error(`Erro: ${err}`));
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header>
                    <div className="header__actions">
                      <span className="header__email">{userEmail}</span>
                      <button
                        className="header__logout"
                        onClick={handleSignOut}
                      >
                        Sair
                      </button>
                    </div>
                  </Header>

                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                  />

                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={infoTooltip}
          onClose={handleCloseInfoTooltip}
          success={success}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
