import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";

import line_2 from "../../../../images/line_2.png";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const nameRef = useRef(); // Cria uma referência inicial como null
  const linkRef = useRef(); // Cria uma referência inicial como null

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    // Limpa os campos do formulário após o envio
    e.target.reset();
  };

  return (
    <form
      className="popup__form "
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          type="text"
          id="card-name"
          name="card-name"
          placeholder="Title"
          minlength="1"
          maxlength="30"
          required
          ref={nameRef} // Atribui a referência ao input do nome
        />

        <span className="popup__error" id="card-name-error"></span>
      </label>

      <img className="popup__line-name" src={line_2} alt="Line Image" />

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          type="url"
          id="card__link"
          name="link"
          placeholder="image link"
          required
          ref={linkRef} // Atribui a referência ao input do link
        />

        <span className="popup__error" id="card-link-error"></span>
      </label>

      <img className="popup__line-about" src={line_2} alt="Line Image" />

      <button className="button popup__button" type="submit">
        salvar
      </button>
    </form>
  );
}
