import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
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
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blogData } = state as ILocationState;
  const { date } = blogData;
  const dateNum = date.split(" ")[0];
  const dateMonth = date.split(" ")[1].toLowerCase();
  const dateYear = date.split(" ")[2];
  blogData.date = dateNum + " " + dateMonth + " " + dateYear;

  return (
    <div className="blog-post h-full ">
      <div className="page-content m-auto my-10 flex flex-col tablet:flex-row tablet:my-20">
        <div
          className="page-back h-full w-4/5 m-auto flex tablet:justify-center cursor-pointer tablet:w-1/6 tablet:m-0"
          onClick={() => {
            navigate(-1);
          }}
        >
          <div className="flex flex-col">
            <h1 className="font-normal h-2 text-2xl leading-8 text-darkgrey font-serif">
              Back
            </h1>
          </div>
        </div>
        <div className="blog-content mt-20 flex flex-col justify-center tablet:w-5/6 tablet:mt-0">
          <div className="blog w-4/5 m-auto tablet:m-0">
            <div className="title laptop:ml-5">
              <h1 className="font-serif text-4xl text-primary font-light tablet:text-5xl">
                {blogData.title}
              </h1>
            </div>
            <div className="author-date font-lexend mt-5 text-lightgrey font-thin text-2xl leading-6 laptop:ml-5">
              <h1 className="mb-3">written by @{blogData.username}</h1>
              <h1>on {blogData.date}</h1>
            </div>
            <div className="content mt-10">
              <p className="font-lexend font-light text-xl first-letter:text-7xl leading-normal whitespace-pre-line tablet:text-2xl">
                {blogData.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;
