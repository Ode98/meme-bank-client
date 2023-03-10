import React from "react";
import { useState } from "react";

const MemePostForm = ({
  createMeme,
  user,
  setMemePostFormVisible,
  setNotificationMessage,
}) => {
  const [file, setFile] = useState(null);
  const isDisabled = user === null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    const files = Object.values(file);
    createMeme(files);
    setFile(null);
    document.getElementById("formid").reset();
    setMemePostFormVisible(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files);
  };

  return (
    <div className="meme-post-form">
      <form id="formid" onSubmit={handleSubmit}>
        <b>Lataa kuvia palvelimelle</b>
        <input
          type="file"
          id="file"
          name="file"
          multiple="multiple"
          onChange={handleFileChange}
          disabled={isDisabled}
        />
        <br />
        <button type="submit" disabled={isDisabled}>
          Lähetä
        </button>
      </form>
    </div>
  );
};

export default MemePostForm;
