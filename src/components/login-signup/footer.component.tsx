import { Link } from "react-router-dom";

interface Content {
  msg: string;
  to: string;
  link: string;
}
const Footer = ({ msg, to, link }: Content) => {
  return (
    <span className="font-lexend text-xl leading-6 not-italic text-darkgrey">
      {msg}
      <Link className="authentication-link ml-1 text-primary" to={to}>
        {link}
      </Link>
    </span>
  );
};
export default Footer;
