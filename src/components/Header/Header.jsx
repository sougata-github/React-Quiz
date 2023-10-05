import logo from "../assets/react.svg";
import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1>The React Quiz</h1>
      <img src={logo} alt="React logo" height={120} />
    </header>
  );
};

export default Header;
