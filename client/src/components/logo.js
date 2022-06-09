// import Logo from "../images/BMLogo.png";
import Logo from "../images/Logo-screenshot.png";

export default function BMLogo() {
  return (
    <div>
      <img
        styles={{ minWidth: 150, minHeight: 150 }}
        src={Logo}
        alt="Bowel Movement logo"
      />
    </div>
  );
}
