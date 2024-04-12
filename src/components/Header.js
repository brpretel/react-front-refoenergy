import "../style/Header.css";

function Header({ title }) {
  return (
    <div className="container">
      <div className="left-container">
        <h2>{title}</h2>
        <p>time 10/10/10</p>
      </div>
    </div>
  );
}

export default Header;
