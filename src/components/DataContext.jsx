import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [workList, setWorkList] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageName, setImageName] = useState("");
  const [contextImage, setContextImage] = useState(null);
  const [isClosed, setIsClosed] = useState(true);

  async function getData() {
    await axios.get("http://localhost:3001/read").then((response) => {
      setWorkList(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const addToWorksList = async (e, image, title, link, description) => {
    e.preventDefault();

    try {
      const formData = { image, title, link, description };

      await axios.post("http://localhost:3001/create", formData);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWork = async (id) => {
    await axios.delete(`http://localhost:3001/delete/${id}`);
    getData();
  };

  const toggleHidden = async (id, body) => {
    await axios.patch(`http://localhost:3001/toggleHidden/${id}`, {
      hidden: body,
    });
    getData();
  };

  const handleCardSelect = (work) => {
    setSelectedCard(work);
    setContextImage(work.image);
  };

  const updateCard = async (e, id, image, title, link, description) => {
    e.preventDefault();

    const updatedData = {
      image,
      title,
      link,
      description,
    };

    await axios.patch(`http://localhost:3001/update/${id}`, updatedData);
    getData();
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3001/uploadImage",
        formData
      );

      setImageName(response.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        workList,
        addToWorksList,
        deleteWork,
        toggleHidden,
        handleCardSelect,
        selectedCard,
        updateCard,
        isEditing,
        setIsEditing,
        uploadImage,
        imageName,
        contextImage,
        setContextImage,
        setImageName,
        isClosed,
        setIsClosed,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
