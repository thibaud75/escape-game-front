import React from "react";
import "./GameForm.css";

interface GameFormProps {
  onInputChange: (data: any) => void;
}

const GameForm: React.FC<GameFormProps> = ({ onInputChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onInputChange({ [name]: value });
    console.log(name, value)
  };

  return (
    <>
      <div className="PlayerPlusDate">
        <input
          type="text"
          placeholder="Prénom"
          name="Prenom"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Nom"
          name="Nom"
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="Date"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default GameForm;
