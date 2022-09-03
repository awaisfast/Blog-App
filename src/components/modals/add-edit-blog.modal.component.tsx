import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { useMediaQuery } from "@mui/material";
import CheckAllEnteries from "../../utils/validation/all-enteries.validation.component";
import CheckEntry from "../../utils/validation/title.validation.component";
import Modal from "react-modal";
import BlogDataServices from "../services/crud-blog.component";
import React from "react";

const AddEditBlog = ({
  modalIsOpen,
  setModalIsOpen,
  oldBlogId,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
  oldBlogId: string;
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
    title: string;
    content: string;
    uid: string | null;
    username: string | null;
    date: string;
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [headerTitle, setHeaderTitle] = useState("New Blog");
  const [buttonTitle, setButtonTitle] = useState("PUBLISH");

  const { currentUser } = useContext<IUserContext>(UserContext);
  let isValid: boolean = false; //if all enteries are valid

  const laptop = useMediaQuery("(min-width:1024px)");

  const getDate = () => {
    const date = new Date();
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JULY",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dateof = date.getDate().toString();
    const monthof = date.getMonth();
    const month = months[monthof];
    const yearof = date.getFullYear().toString();
    const dateOfCreation = dateof + " " + month + " " + yearof;
    return dateOfCreation;
  };
  const setValues = (docSnapData: any) => {
    setTitle(docSnapData.title);
    setContent(docSnapData.content);
    setDateCreated(docSnapData.date);
    setHeaderTitle("Edit Blog");
    setButtonTitle("EDIT");
  };
  const editHandler = async () => {
    try {
      const docSnap = await BlogDataServices.getBlog(oldBlogId);
      const docSnapData = docSnap.data();
      setValues(docSnapData);
    } catch (error) {
      console.log("Could not get blog data");
    }
  };
  useEffect(() => {
    if (oldBlogId !== undefined && oldBlogId.length !== 0) {
      editHandler();
    }
  }, [oldBlogId]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (title && content) {
      const date = dateCreated ? dateCreated : getDate();
      const uid = currentUser && currentUser.uid;
      const username = currentUser && currentUser.email.split("@")[0];
      const newBlogObj: IBlogObj = {
        title,
        content,
        uid,
        username,
        date,
      };
      try {
        oldBlogId
          ? await BlogDataServices.updateBlog(oldBlogId, newBlogObj)
          : await BlogDataServices.addBlog(newBlogObj);
        setModalIsOpen(false);
        window.location.reload();
      } catch (error) {
        console.log("blog not added successfully");
      }
    }
    setTitle("");
    setContent("");
    setHeaderTitle("New Blog");
  };
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    name === "title" ? setTitle(value) : setContent(value);

    //to check on which input green borden needs to be implemented
    name === "title" ? titleBorder(value) : contentBorder(value);

    checkEnteries(); //checking if all enteries are valid
  };
  const checkEnteries = () => {
    if (title && content) {
      const submitButton = document.querySelector(
        ".submit-button"
      )! as HTMLButtonElement;
      CheckAllEnteries(isValid, submitButton);
    }
  };
  const titleBorder = (title: string) => {
    const titleInput = document.querySelector(".title-input")! as HTMLElement;
    isValid = CheckEntry(title, titleInput);
  };
  const contentBorder = (content: string) => {
    const contentInput = document.querySelector(
      ".content-input"
    )! as HTMLElement;
    isValid = CheckEntry(content, contentInput);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            width: laptop ? "50%" : "80%",
            height: laptop ? "70%" : "60%",
            margin: "auto",
          },
        }}
      >
        <div className="new-blog h-full w-full m-auto flex flex-col">
          <div className="header flex justify-between items-center w-11/12 m-auto">
            <div className="new-blog">
              <hr className="bg-primary mt-10 h-2 w-10"></hr>
              <h1 className="text-2xl tablet:text-4xl">{headerTitle}</h1>
            </div>
            <div className="close-button pt-10" onClick={closeModal}>
              <FontAwesomeIcon
                className="text-primary text-xl cursor-pointer hover:opacity-50 tablet:text-2xl"
                icon={faCircleXmark}
              />
            </div>
          </div>
          <div className="body w-11/12 mt-5 m-auto h-full">
            <form
              className="form-field flex flex-col h-full"
              onSubmit={handleSubmit}
            >
              <input
                className="title-input"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleChange}
                required
              />
              <textarea
                className="content-input resize-none overflow-hidden p-5 h-3/5 border-solid border-2 border-gray-300 rounded-none outline-none overflow-y-auto text-gray-500"
                name="content"
                placeholder="Content"
                value={content}
                onChange={handleChange}
                required
              ></textarea>

              <div className="flex justify-end">
                <button
                  className="submit-button max-w-screen-sm mt-5 py-3 w-full bg-primary opacity-30 text-white font-semibold text-xl not-italic tablet:w-1/4 tablet:py-5 tablet:text-2xl"
                  type="submit"
                  disabled={true}
                >
                  {buttonTitle}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AddEditBlog;
