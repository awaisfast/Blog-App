interface ImageContent {
  props: string;
}
const ImageBackground = ({ props }: ImageContent) => {
  return (
    <div className="signUp-Image w-2/5 bg-[url('/src/assets/bg-img.jpg')] hidden tablet:block">
      <h1 className="h-full flex justify-center items-center rotate-[-90deg] font-bold text-6xl text-white not-italic">
        {props}
      </h1>
    </div>
  );
};
export default ImageBackground;
