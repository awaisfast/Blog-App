import { Link } from "react-router-dom";

interface Content {
  content: string[];
}
const Footer = ({ content }: Content) => {
  return (
    <span className="font-normal text-xl leading-6 not-italic text-[#272727]">
      {content[0]}
      <Link className="authentication-link ml-1 text-[#56CC6A]" to={content[1]}>
        {content[2]}
      </Link>
    </span>
  );
};
export default Footer;
