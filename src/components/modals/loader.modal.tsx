import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import { Dispatch } from "react";
import { useMediaQuery } from "@mui/material";

const Loader = ({
  loaderIsOpen,
  setLoaderIsOpen,
}: {
  loaderIsOpen: boolean;
  setLoaderIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const laptop = useMediaQuery("(min-width:1024px)");

  return (
    <div className="loader">
      <Modal
        isOpen={loaderIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            width: laptop ? "100%" : "80%",
            height: laptop ? "100%" : "60%",
            margin: "auto",
          },
        }}
      >
        <div className="w-full h-full flex justify-center items-center">
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      </Modal>
    </div>
  );
};
export default Loader;
