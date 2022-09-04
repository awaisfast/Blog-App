import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BlogPost = () => {
  interface ILocationState {
    blogData: {
      data: {
        id: number;
        title: string;
        date: string;
        username: string;
        content: string;
      };
    };
  }
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blogData } = state as ILocationState;
  const { data } = blogData;
  const { date } = data;
  const dateNum = date.split(" ")[0];
  const dateMonth = date.split(" ")[1].toLowerCase();
  const dateYear = date.split(" ")[2];
  data.date = dateNum + " " + dateMonth + " " + dateYear;

  return (
    <div className="blog-post h-full ">
      <div className="page-content m-auto my-10 flex flex-col tablet:flex-row tablet:my-20">
        <div
          className="page-back h-full w-4/5 m-auto flex tablet:justify-center cursor-pointer tablet:w-1/6 tablet:m-0"
          onClick={() => {
            navigate(-1);
          }}
        >
          <h1 className="font-normal h-2 text-2xl leading-8 text-darkgrey font-serif">
            Back
          </h1>
        </div>
        <div className="blog-content mt-20 flex flex-col justify-center tablet:w-5/6 tablet:mt-0">
          <div className="blog w-4/5 m-auto tablet:m-0">
            <div className="title laptop:ml-5">
              <h1 className="font-serif text-4xl text-primary font-light tablet:text-5xl">
                {data.title}
              </h1>
            </div>
            <div className="author-date font-lexend mt-5 text-lightgrey font-thin text-2xl leading-6 laptop:ml-5">
              <h1 className="mb-3">writter by @{data.username}</h1>
              <h1>on {data.date}</h1>
            </div>
            <div className="content mt-10">
              <p className="font-lexend font-normal text-xl first-letter:text-7xl leading-normal tablet:text-2xl">
                {data.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;
