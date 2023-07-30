import { Dispatch } from "react";
import Modal from "react-modal";
import { useMediaQuery } from "@mui/material";
import BlogDataServices from "../services/crud-blog.component";
import matchers from "@testing-library/jest-dom/matchers";

const Deletion = ({
  confirmIsOpen,
  setConfirmIsOpen,
  setLoaderIsOpen,
  delBlogId,
}: {
  confirmIsOpen: boolean;
  setLoaderIsOpen: Dispatch<React.SetStateAction<boolean>>;
  setConfirmIsOpen: Dispatch<React.SetStateAction<boolean>>;
  delBlogId: string;
}) => {
  const tablet = useMediaQuery("(min-width:640px)");
  return (
    <>
      <Modal
        isOpen={confirmIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            width: tablet ? "25%" : "80%",
            height: tablet ? "20%" : "15%",
            margin: "auto",
          },
        }}
      >
        <div className="confirm-del h-full w-full m-auto font-lexend flex flex-col justify-center items-center tablet:w-2/3">
          <div className="title text-xl whitespace-nowrap tablet:text-2xl">
            <hr className="bg-primary h-1 w-10"></hr>
            <h1 className="text-lg">Are you sure, you want to delete?</h1>
          </div>
          <div className="buttons flex text-xl justify-around mt-5 tablet:flex-row tablet:text-2xl">
            <div className="buttons">
              <button
                className="mr-3 px-5 py-1 bg-white text-darkgrey border-2 border-darkgrey opacity-30 cursor-pointer hover:opacity-100 tablet:mr-5 tablet:px-5 tablet:py-3"
                type="submit"
                onClick={() => {
                  setConfirmIsOpen(false);
                }}
              >
                No
              </button>
              <button
                className="ml-3 px-5 py-1 bg-darkgrey text-white opacity-30 cursor-pointer hover:opacity-100 tablet:ml-5 tablet:px-5 tablet:py-3"
                type="submit"
                onClick={async () => {
                  setConfirmIsOpen(false);
                  setLoaderIsOpen(true);
                  //confirm value from confirmModal
                  await BlogDataServices.deleteBlog(delBlogId);
                  setLoaderIsOpen(false);
                  window.location.reload();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Deletion;
