import { useRef } from "react";
import line_2 from "../../../../images/line_2.png";

export default function EditAvatar({ onUpdateAvatar }) {
  const avatarRef = useRef(); // Cria uma referência inicial como null

  function handleSubmit(e) {
    e.preventDefault();

    // Acessamos o valor através de .current.value
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_avatar-url"
          type="url"
          id="avatar__url"
          name="avatar"
          placeholder="Image url"
          required
        />

        <span className="popup__error" id="avatar-url-error"></span>
      </label>

      <img className="popup__line-about" src={line_2} alt="Line Image" />

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
