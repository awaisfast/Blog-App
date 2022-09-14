import { useNavigate } from "react-router-dom";
import Contents from "./data.json";
const BlogsContent = () => {
  const navigate = useNavigate();
  return (
    <div className="home-contents h-full w-5/6 m-auto flex flex-col laptop:ml-25 laptop:w-4/5">
      <div className="latest flex flex-col items-center tablet:items-start">
        <hr className="bg-primary mt-10 h-1 w-5" />
        <h1 className="font-light text-2xl leading-8 text-darkgrey font-lexend">
          Latest
        </h1>
      </div>
      <div className="blogs flex flex-col">
        {Contents.map((data) => {
          return (
            <div key={data.id} className="blog my-5">
              <h1 className="date hidden font-semibold text-2xl leading-7 not-italic font-lexend tablet:block">
                {data.date}
              </h1>
              <h1
                className="title mt-3 mb-2 font-medium font-serif text-2xl leading-8 not-italic text-primary tablet:text-4xl cursor-pointer"
                onClick={() => {
                  navigate("/blog-post", {
                    state: { blogData: { data } },
                  });
                }}
              >
                {data.title}
              </h1>
              <p className="content font-normal text-base leading-5 not-italic font-lexend tablet:text-xl tablet:leading-6">
                {data.content.length > 250
                  ? data.content.slice(0, 250)
                  : data.content}{" "}
                {data.content.length > 250 && (
                  <button
                    className="read-more font-light text-xl leading-6 not-italic font-lexend text-primary"
                    onClick={() => {
                      navigate("/blog-post", {
                        state: { blogData: { data } },
                      });
                    }}
                  >
                    ...read more
                  </button>
                )}
              </p>
              <div className="userName mt-5 flex justify-between items-center">
                <h1 className="date font-semibold text-base leading-5 not-italic font-lexend tablet:hidden">
                  {data.date}
                </h1>
                <h1 className="text-lightgrey font-lexend font-light text-base leading-5">
                  {data.username}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BlogsContent;
