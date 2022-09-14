interface ImageBackgroundProps {
  props: string;
}
const ImageBackground = ({ props }: ImageBackgroundProps) => {
  return (
    <div className="signUp-Image bg-no-repeat bg-cover w-2/5 bg-authbackground hidden tablet:block">
      <h1 className="h-full flex justify-center items-center rotate-[-90deg] font-bold text-6xl text-white not-italic">
        {props}
      </h1>
    </div>
  );
};
export default ImageBackground;
