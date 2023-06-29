import "./GameForm.css";

const GameForm = () => {
  return (
    <>
      <div className="PlayerPlusDate">
        <input type="text" placeholder="Prénom"></input>
        <input type="text" placeholder="Nom"></input>
        <input type="date"></input>
      </div>
    </>
  );
};

export default GameForm;
