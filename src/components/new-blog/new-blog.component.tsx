import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import CheckAllEnteries from "../../utils/validation/all-enteries.validation.component";
import CheckEntry from "../../utils/validation/title.validation.component";
import Modal from "react-modal";
import BlogDataServices from "../services/crud-blog.component";
import React from "react";

const NewBlog = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  type defaultForms = {
    title: string;
    content: string;
  };
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

  const defaultFormFields: defaultForms = {
    title: "",
    content: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { title, content } = formFields;
  const { currentUser } = useContext<IUserContext>(UserContext);
  let isValid: boolean = false; //if all enteries are valid

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (formFields) {
      const date = getDate();
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
        await BlogDataServices.addBlog(newBlogObj);
        setModalIsOpen(false);
        window.location.reload();
      } catch (error) {
        console.log("blog not added successfully");
      }
    }
    setFormFields(defaultFormFields);
  };
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    //to check on which input green borden needs to be implemented
    if (name === "title") {
      titleBorder(value);
    } else if (name === "content") {
      contentBorder(value);
    }
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
            width: "60%",
            height: "80%",
            margin: "auto",
          },
        }}
      >
        <div className="new-blog h-full w-full m-auto flex flex-col">
          <div className="header flex justify-between items-center w-5/6 m-auto">
            <div className="new-blog">
              <hr className="bg-primary mt-10 h-2 w-10"></hr>
              <h1 className="text-4xl">New Blog</h1>
            </div>
            <div className="close-button pt-10" onClick={closeModal}>
              <FontAwesomeIcon
                className="text-primary text-2xl cursor-pointer hover:opacity-50"
                icon={faCircleXmark}
              />
            </div>
          </div>
          <div className="body w-5/6 m-auto h-full">
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
                className="content-input resize-none overflow-hidden p-5 h-3/5 border-solid border-2 border-gray-300 rounded-none outline-none text-gray-500"
                name="content"
                placeholder="Content"
                value={content}
                onChange={handleChange}
                required
              ></textarea>

              <button
                className="submit-button max-w-screen-sm mt-5 py-5 w-full bg-primary opacity-30 text-white font-semibold text-2xl not-italic tablet:w-1/3"
                type="submit"
                disabled={true}
              >
                PUBLISH
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NewBlog;
