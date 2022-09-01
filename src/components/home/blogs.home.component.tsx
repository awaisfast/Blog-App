import { useNavigate } from "react-router-dom";
import BlogDataServices from "../services/crud-blog.component";
import { useEffect, useState } from "react";
const BlogsContent = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  let dataDocs;
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const data: any = await BlogDataServices.getAllBlogs();
    dataDocs = data.docs;
    setBlogs(dataDocs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };
  return (
    <div className="home-contents h-full w-5/6 m-auto flex flex-col laptop:ml-25 laptop:w-4/5">
      <div className="latest flex flex-col items-center tablet:items-start">
        <hr className="bg-primary mt-10 h-1 w-5"></hr>
        <h1 className="font-light text-2xl leading-8 text-darkgrey font-lexend">
          Latest
        </h1>
      </div>
      <div className="blogs flex flex-col">
        {blogs ? (
          blogs.map((data: any) => {
            return (
              <div key={data.id} className="blog my-5">
                <h1 className="date hidden font-semibold text-2xl leading-7 not-italic font-lexend tablet:block">
                  {data.date}
                </h1>
                <h1
                  className="title mt-3 font-medium font-serif text-2xl leading-8 not-italic text-primary tablet:text-4xl cursor-pointer"
                  onClick={() => {
                    navigate("/blog-post", {
                      state: { blogData: { data } },
                    });
                  }}
                >
                  {data.title}
                </h1>
                <br />
                <span className="content font-normal text-base leading-5 not-italic font-lexend tablet:text-xl tablet:leading-6">
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
                </span>
                <div className="userName mt-5 flex justify-between items-center">
                  <h1 className="date font-semibold text-base leading-5 not-italic font-lexend tablet:hidden">
                    {data.date}
                  </h1>
                  <h1 className="text-[#A5A5A5] font-lexend font-light text-base leading-5">
                    {data.username}
                  </h1>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty flex justify-center items-center">
            <h1 className="text-5xl">There nothing to show 😔</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default BlogsContent;
