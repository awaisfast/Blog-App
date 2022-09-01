import { useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import BlogDataServices from "../services/crud-blog.component";
const NewBlog = () => {
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
        console.log("blog added successfully");
      } catch (error) {
        console.log("blog not added successfully");
      }
    }
    setFormFields(defaultFormFields);
  };
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="input-fields flex flex-col justify-center items-center">
      <form className="form-field flex flex-col" onSubmit={handleSubmit}>
        <input
          className="name-input"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
          required
        />

        <input
          className="name-input"
          type="text"
          name="content"
          placeholder="Write here..."
          value={content}
          onChange={handleChange}
          required
        />

        <button
          className="submit-button max-w-screen-sm mt-5 pt-5 pb-5 w-1/1 bg-darkgrey text-white opacity-30 font-semibold text-xl not-italic tablet:w-2/6"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default NewBlog;
