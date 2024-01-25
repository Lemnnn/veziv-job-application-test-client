import FormImageUpload from "./FormImageUpload";
import FormInput from "./FormInput";
import FormDescription from "./FormDescription";
import FormButton from "./FormButton";
import { useEffect, useState } from "react";
import { useData } from "./DataContext";
import { RxCross1 } from "react-icons/rx";

const Form = () => {
  const {
    addToWorksList,
    selectedCard,
    updateCard,
    isEditing,
    setIsEditing,
    uploadImage,
    imageName,
    setContextImage,
    setImageName,
    isClosed,
    setIsClosed,
  } = useData();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target.result);
        setContextImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
    uploadImage(selectedImage);
  };

  useEffect(() => {
    if (isEditing) {
      setLink(selectedCard.link);
      setDescription(selectedCard.description);
      setTitle(selectedCard.title);
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      if (
        title.trim() === "" ||
        link.trim() === "" ||
        description.trim() === ""
      ) {
        setErrorMessage("Please fill in all required fields");
      } else {
        addToWorksList(e, imageName, title, link, description);
        resetForm();
        setIsClosed(true);
      }
    } else {
      if (
        title.trim() === "" ||
        link.trim() === "" ||
        description.trim() === ""
      ) {
        setErrorMessage("Please fill in all required fields");
      } else {
        updateCard(e, selectedCard._id, imageName, title, link, description);
        resetForm();
        setIsEditing(false);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setLink("");
    setDescription("");
    setPreviewURL("");
    setContextImage(null);
    setImageName("");
    setErrorMessage("");
  };

  return (
    <div
      encType="multipart/form-data"
      className={
        !isClosed
          ? "w-[450px] h-screen px-10 pt-10 flex flex-col justify-start top-0 bg-black sticky overflow-scroll no-scrollbar max-md:w-full"
          : "w-[450px] h-screen px-10 pt-10 flex flex-col justify-start top-0 bg-black sticky overflow-scroll no-scrollbar max-md:hidden"
      }
    >
      <div
        className="md:hidden text-white cursor-pointer self-end mb-4 translate-x-5 -translate-y-5"
        onClick={() => setIsClosed(true)}
      >
        <RxCross1 size={25} />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Submit a Project</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your project details
        </p>
      </div>
      {errorMessage ? (
        <div className="text-white bg-red-600 rounded-lg text-center my-1">
          {errorMessage}
        </div>
      ) : null}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <FormImageUpload
          type="file"
          label="Image"
          name="image"
          accept="image/*"
          image={previewURL}
          onChange={handleImage}
        />
        <FormInput
          label="Title*"
          type="text"
          value={title}
          placeholder="Project Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <FormInput
          label="Link*"
          type="text"
          value={link}
          placeholder="Project Link"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <FormDescription
          label="Description*"
          value={description}
          placeholder="Project Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {!isEditing ? (
          <FormButton label="Submit" type="submit" />
        ) : (
          <div className="flex flex-col gap-2">
            <FormButton label="Confirm changes" type="submit" />
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-primary-foreground hover:bg-red-600/90 h-10 px-4 py-2 w-full"
              onClick={() => {
                resetForm();
                setIsEditing(false);
                setContextImage(null);
                setIsClosed(true);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
