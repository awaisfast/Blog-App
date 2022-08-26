interface Content {
  content: string;
}
const WelcomeContent = ({ content }: Content) => {
  return (
    <div className="welcome mt-0 flex flex-col items-center laptop:items-start">
      <h1 className="font-normal text-5xl not-italic text-[#272727] font-serif">
        Welcome
      </h1>
      <p className="font-light text-2xl leading-7 not-italic text-[#A5A5A5] font-lexend">
        Let's {content} quickly
      </p>
    </div>
  );
};
export default WelcomeContent;
