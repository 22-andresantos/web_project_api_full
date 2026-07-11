import line_2 from "../../../../images/line_2.png";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const currentUseContext = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const { currentUser, handleUpdateUser } = currentUseContext; // Desestrutura o objeto para obter currentUser e handleUpdateUser

  const [name, setName] = useState(currentUser.name); // Adicione variável de estado para nome
  const [description, setDescription] = useState(currentUser.about); // Adicione variável de estado para descrição

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o estado do nome com o valor do input
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza o estado da descrição com o valor do input
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    handleUpdateUser({ name, about: description }); // Chama a função de atualização do usuário com os novos valores
    // Fecha o popup após o envio do formulário
  };

  return (
    <form
      className="popup__form"
      name="card-profile"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_profile-name"
          type="text"
          id="owner-name"
          name="profile-name"
          placeholder="Title"
          minLength="2"
          maxLength="40"
          required
          value={name} // Define o valor do input como o estado do nome
          onChange={handleNameChange} // Adiciona o manipulador de evento para atualizar o estado do nome
        />

        <span className="popup__error" id="owner-name-error"></span>
      </label>

      <img className="popup__line-name" src={line_2} alt="Line Image" />

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          type="text"
          id="owner-description"
          name="userDescription"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={description} // Define o valor do input como o estado da descrição
          onChange={handleDescriptionChange} // Adiciona o manipulador de evento para atualizar o estado da descrição
        />

        <span className="popup__error" id="profile-job-error"></span>
      </label>

      <img className="popup__line-about" src={line_2} alt="Line Image" />

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
