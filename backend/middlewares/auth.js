const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({
      message: "Não autorizado",
    });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).send({
      message: "Não autorizado",
    });
  }
};

// const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

// function checkResponse(res) {
//   if (!res.ok) {
//     return Promise.reject(`Erro: ${res.status}`);
//   }

//   return res.json();
// }

//  Registrar um novo usuário
// export function register(email, password) {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   }).then(checkResponse);
// }

//  Autenticar um usuário existente
// export function authorize(email, password) {
//   return fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   }).then(checkResponse);
// }

//  Verificar a validade do token JWT
// export function checkToken(token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// }
