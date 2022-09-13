import { useNavigate } from "react-router-dom";
import BlogDataServices from "../services/crud-blog.component";
import { Dispatch, useEffect, useState } from "react";
const BlogsContent = ({
  searchIsOpen,
  setSearchIsOpen,
  setLoaderIsOpen,
}: {
  searchIsOpen: boolean;
  setSearchIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setLoaderIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  let dataDocs;
  useEffect(() => {
    getBlogs();
  }, []);
  useEffect(() => {
    const searchField = document.querySelector(".search-field");
    searchIsOpen
      ? searchField?.classList.remove("invisible")
      : searchField?.classList.add("invisible");
  }, [searchIsOpen]);

  const getBlogs = async () => {
    setLoaderIsOpen(true);
    const data: any = await BlogDataServices.getAllBlogs();
    setLoaderIsOpen(false);
    dataDocs = data.docs;
    setBlogs(dataDocs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };
  const searchHandleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  return (
    <div className="home-contents h-full w-5/6 m-auto flex flex-col laptop:w-4/5">
      <div className="latest flex flex-col items-start">
        <hr className="bg-primary mt-10 h-1 w-5"></hr>
        <h1 className="font-lexend font-light text-2xl leading-8 text-darkgrey">
          Latest
        </h1>
      </div>
      <div className="search-field mt-2 invisible w-full tablet:mt-0">
        <div className="search flex justify-center">
          <input
            className="h-10 px-5 w-3/4 font-lexend rounded-full border-2 outline-none focus:outline-primary tablet:w-1/2"
            type="search"
            placeholder="search"
            onChange={searchHandleChange}
            autoFocus
          />
          <button
            className="font-lexend mt-2 ml-2 tablet:mt-0"
            onClick={() => {
              setSearchIsOpen(false);
              setSearchTerm("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="blogs flex flex-col mt-0">
        {blogs ? (
          blogs
            .sort((a: any, b: any) => {
              return b.time.toDate().getTime() - a.time.toDate().getTime();
            })
            .filter((data: any) => {
              if (searchTerm === "") {
                return data;
              } else if (
                data.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data: any) => {
              return (
                <div key={data.id} className="blog mb-10">
                  <h1 className="date hidden font-semibold text-2xl leading-7 not-italic font-lexend tablet:block">
                    {data.date.split(" ")[0]} {data.date.split(" ")[1]}
                  </h1>
                  <h1
                    className="title w-fit mt-3 font-medium font-serif text-2xl leading-8 not-italic text-primary tablet:text-4xl cursor-pointer"
                    onClick={() => {
                      navigate("/blog-post", {
                        state: { blogData: { data } },
                      });
                    }}
                  >
                    {data.title}
                  </h1>
                  <br />
                  <span
                    className="content font-light text-base leading-5 not-italic font-lexend cursor-pointer tablet:text-xl tablet:leading-6"
                    onClick={() => {
                      navigate("/blog-post", {
                        state: { blogData: { data } },
                      });
                    }}
                  >
                    {data.content.length > 250
                      ? data.content.slice(0, 250)
                      : data.content}{" "}
                    {data.content.length > 250 && (
                      <button
                        className="read-more font-light text-base leading-6 not-italic font-lexend text-primary tablet:text-xl"
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
                    <h1 className="date font-lexend font-semibold text-base leading-5 not-italic tablet:hidden">
                      {data.date}
                    </h1>
                    <h1 className="font-lexend text-[#A5A5A5] font-light text-base leading-5">
                      @{data.username}
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
