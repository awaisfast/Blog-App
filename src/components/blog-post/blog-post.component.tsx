import { useLocation } from "react-router-dom";

const BlogPost = () => {
  interface ILocationState {
    blogData: {
      id: number;
      title: string;
      date: string;
      username: string;
      content: string;
    };
  }
  const { state } = useLocation();
  const { blogData } = state as ILocationState;

  console.log(blogData);
  return (
    <div className="blogPost h-full ">
      <div className="pageContent m-auto my-10 flex flex-col tablet:flex-row tablet:my-20">
        <div className="pageBack w-4/5 m-auto flex tablet:justify-center tablet:w-1/6 tablet:m-0">
          <a href="/" className="h-fit">
            <h1 className="font-normal text-2xl leading-8 text-darkgrey font-serif">
              Back
            </h1>
            <hr className="bg-backArrow mt-10 h-1 w-5"></hr>
          </a>
        </div>
        <div className="blogContent mt-20 flex flex-col justify-center tablet:w-5/6 tablet:mt-0">
          <div className="blog w-4/5 m-auto tablet:m-0">
            <div className="title">
              <h1 className="font-serif text-4xl text-primary font-light tablet:text-5xl">
                Nothing to show
              </h1>
            </div>
            <div className="authorAndDate font-lexend mt-5 text-lightgrey font-thin text-2xl leading-6">
              <h1 className="mb-3">writter by @awaisali</h1>
              <h1>on 27 May 2022</h1>
            </div>
            <div className="content mt-20">
              <p className="font-lexend font-normal text-xl leading-normal tablet:text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Luctus venenatis lectus magna fringilla urna. Aliquet porttitor
                lacus luctus accumsan tortor posuere ac ut. Eleifend quam
                adipiscing vitae proin sagittis nisl rhoncus. Faucibus ornare
                suspendisse sed nisi lacus sed viverra tellus. Urna molestie at
                elementum eu facilisis sed odio morbi. Eget mi proin sed libero
                enim. Quis varius quam quisque id diam vel quam. Duis at tellus
                at urna condimentum mattis pellentesque. Nulla facilisi cras
                fermentum odio eu feugiat pretium nibh. Ut tellus elementum
                sagittis vitae et leo. Cursus in hac habitasse platea dictumst
                quisque sagittis purus. Odio facilisis mauris sit amet. Quis vel
                eros donec ac odio. Orci a scelerisque purus semper. Amet justo
                donec enim diam vulputate ut pharetra. Arcu odio ut sem nulla
                pharetra diam sit amet nisl. Sapien eget mi proin sed libero
                enim. Nunc sed blandit libero volutpat sed cras ornare arcu dui.
                Neque viverra justo nec ultrices dui sapien eget mi. Cras semper
                auctor neque vitae tempus quam pellentesque nec nam. Vitae
                tortor condimentum lacinia quis vel eros donec ac. Consectetur
                adipiscing elit pellentesque habitant morbi. Enim tortor at
                auctor urna nunc id cursus metus. Elit sed vulputate mi sit.
                Quis viverra nibh cras pulvinar mattis nunc sed. In aliquam sem
                fringilla ut morbi tincidunt. Orci a scelerisque purus semper.
                Dignissim sodales ut eu sem integer vitae justo.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;
