import { Link } from "react-router-dom";

interface FooterProps {
  message: string;
  to: string;
  link: string;
}
const Footer = ({ message, to, link }: FooterProps) => {
  return (
    <p className="font-normal text-xl leading-6 not-italic text-darkgrey">
      {message}
      <Link className="authentication-link ml-1 text-primary" to={to}>
        {link}
      </Link>
    </p>
  );
};
export default Footer;
