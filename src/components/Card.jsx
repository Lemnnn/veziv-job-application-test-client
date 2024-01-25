import { useState } from "react";
import { useData } from "./DataContext";
import Placeholder from "../image/no_image.jpg";

const Card = ({ work }) => {
  const {
    deleteWork,
    toggleHidden,
    handleCardSelect,
    setIsEditing,
    setIsClosed,
  } = useData();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rounded-lg pb-4 border bg-card text-card-foreground shadow-sm w-full max-w-md h-fit mx-auto relative transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {work.image ? (
        <img
          className="aspect-[5/3] overflow-hidden rounded-t-lg object-cover"
          src={`https://veziv-server-production.up.railway.app/images/${work.image}`}
          alt="Uploaded"
          width="500"
          height="300"
        />
      ) : (
        <img
          className="aspect-[5/3] overflow-hidden rounded-t-lg object-cover"
          src={Placeholder}
          alt="Uploaded"
          width="500"
          height="300"
        />
      )}
      <div className="p-2">
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-gray-200 hover:text-accent-foreground h-10 px-4 py-2 w-full"
            onClick={() => {
              handleCardSelect(work);
              setIsEditing(true);
              setIsClosed(false);
            }}
          >
            Edit
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-gray-200 hover:text-accent-foreground h-10 px-4 py-2 w-full"
            onClick={() => toggleHidden(work._id, !work.hidden)}
          >
            Hide
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-gray-200 hover:text-accent-foreground h-10 px-4 py-2 w-full"
            onClick={() => deleteWork(work._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 py-1 space-y-1 h-[145px] no-scrollbar overflow-y-scroll ">
        <h3
          className={`text-2xl font-bold ${
            isHovered ? "line-clamp-none" : "line-clamp-1"
          }`}
        >
          {work.title}
        </h3>
        <a
          href={work.link}
          target="_blank"
          rel="noreferrer"
          className={`text-sm underline text-blue-500 ${
            isHovered ? "line-clamp-none" : "line-clamp-1"
          }`}
        >
          {work.link}
        </a>
        <p
          className={`text-sm text-muted-foreground pt-5 ${
            isHovered ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {work.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
