import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import BlogDataServices from "../services/crud-blog.component";
import AddEditBlog from "../modals/add-edit-blog.modal.component";
const MyBlogsContent = ({
  searchIsOpen,
  setSearchIsOpen,
  setLoaderIsOpen,
}: {
  searchIsOpen: boolean;
  setSearchIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setLoaderIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  interface ICurrentUser {
    uid: string;
    displayName: string;
    email: string;
  }
  interface IUserContext {
    currentUser: null | ICurrentUser;
    setCurrentUser: (currentUser: null) => void;
  }
  interface IBlogObj {
    id: string;
    title: string;
    content: string;
    uid: string | null;
    username: string | null;
    date: string;
  }
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const { currentUser } = useContext<IUserContext>(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [oldBlogId, setOldBlogId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  let dataDocs;
  let myBlogs: any = [];
  useEffect(() => {
    getBlogs();
  }, []);
  useEffect(() => {
    if (blogs.length > 0) {
      getMyBlogs();
    }
  }, [blogs]);
  useEffect(() => {
    const searchField = document.querySelector(".search-field");
    searchIsOpen
      ? searchField?.classList.remove("invisible")
      : searchField?.classList.add("invisible");
  }, [searchIsOpen]);
  const getMyBlogs = () => {
    blogs.map((blog: IBlogObj) => {
      if (currentUser) {
        if (blog.uid === currentUser.uid) {
          myBlogs.push(blog);
        }
      }
    });
    setUserBlogs(myBlogs);
  };
  const getBlogs = async () => {
    setLoaderIsOpen(true);
    const data: any = await BlogDataServices.getAllBlogs();
    setLoaderIsOpen(false);
    dataDocs = data.docs;
    setBlogs(dataDocs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const searchHandleChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  return (
    <>
      <AddEditBlog
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setLoaderIsOpen={setLoaderIsOpen}
        oldBlogId={oldBlogId}
      />
      <div className="home-contents h-full w-5/6 m-auto flex flex-col laptop:ml-25 laptop:w-4/5">
        <div className="my-blogs flex flex-col-reverse items-center tablet:items-start tablet:flex-row">
          <div className="header">
            <hr className="bg-primary mt-10 h-1 w-5"></hr>
            <h1 className="font-lexend font-light text-2xl leading-8 text-darkgrey">
              My Blogs
            </h1>
          </div>
          <div className="go-home mt-11 cursor-pointer tablet:ml-5">
            <h1
              className="font-lexend font-light text-xl leading-8 text-darkgrey"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </h1>
          </div>
        </div>
        <div className="search-field mt-2 w-full laptop:mt-0">
          <div className="search flex w-3/5 m-auto flex-col tablet:flex-row tablet:w-full tablet:m-0 tablet:justify-center ">
            <input
              className="search-input h-10 px-5 font-lexend rounded-full border-2 outline-none focus:outline-primary tablet:w-1/2"
              type="search"
              placeholder="search"
              onChange={searchHandleChange}
            />
            <button
              className="font-lexend mt-2 tablet:ml-2 tablet:mt-0"
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
          {userBlogs.length > 0 &&
            userBlogs
              .filter((data: any) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data: IBlogObj) => {
                return (
                  <div key={data.id} className="blog mb-5">
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
                      className="content font-normal text-base leading-5 not-italic font-lexend cursor-pointer tablet:text-xl tablet:leading-6"
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
                        <button className="read-more font-light text-xl leading-6 not-italic font-lexend text-primary">
                          ...read more
                        </button>
                      )}
                    </span>
                    <div className="userName mt-5 flex justify-between items-center">
                      <h1 className="date font-semibold text-base leading-5 not-italic font-lexend tablet:hidden">
                        {data.date}
                      </h1>
                      <h1 className="text-[#A5A5A5] font-lexend font-light text-base leading-5">
                        @{data.username}
                      </h1>
                    </div>
                    <div className="edit-del mt-3 flex justify-end w-full">
                      <div className="flex justify-between w-1/4 laptop:w-1/12 tablet:w-1/6">
                        <div
                          className="edit-icon flex flex-row justify-center items-center cursor-pointer hover:opacity-50"
                          onClick={() => {
                            setOldBlogId(data.id);
                            openModal();
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-2xl text-primary tablet:text-3xl"
                            icon={faPenToSquare}
                          />
                        </div>
                        <div
                          className="delete-icon flex flex-row justify-center items-center cursor-pointer hover:opacity-50"
                          onClick={async () => {
                            setLoaderIsOpen(true);
                            await BlogDataServices.deleteBlog(data.id);
                            setLoaderIsOpen(false);
                            window.location.reload();
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-2xl text-primary tablet:text-3xl"
                            icon={faTrashCan}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          {userBlogs.length === 0 && (
            <div className="empty flex justify-center items-center">
              <h1>You have no blogs to show 😔</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyBlogsContent;
