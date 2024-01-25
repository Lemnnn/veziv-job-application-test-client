import { useRef } from "react";
import { useData } from "./DataContext";

const FormImageUpload = ({ name, type, onChange, accept, image }) => {
  const { isEditing, contextImage } = useData();

  const fileInputRef = useRef(null);

  return (
    <div className="h-fit">
      <div
        className="rounded-lg mt-2 border-4 bg-white h-[230px] border-white w-full text-black flex items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        {isEditing && !image && contextImage !== "" ? (
          <img
            src={`https://veziv-server-production.up.railway.app/images/${contextImage}`}
            className="max-w-full max-h-full rounded-lg object-cover"
          />
        ) : (
          <img
            src={image}
            className="max-w-full max-h-full rounded-lg object-cover"
          />
        )}
        {!isEditing && !image ? "Upload Image" : null}
      </div>
      <input
        type={type}
        className="hidden"
        name={name}
        onChange={onChange}
        accept={accept}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FormImageUpload;
