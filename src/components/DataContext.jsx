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
    await axios
      .get("https://veziv-server-production.up.railway.app/read")
      .then((response) => {
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

      await axios.post(
        "https://veziv-server-production.up.railway.app/create",
        formData
      );
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWork = async (id) => {
    await axios.delete(
      `https://veziv-server-production.up.railway.app/delete/${id}`
    );
    getData();
  };

  const toggleHidden = async (id, body) => {
    await axios.patch(
      `https://veziv-server-production.up.railway.app/toggleHidden/${id}`,
      {
        hidden: body,
      }
    );
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

    await axios.patch(
      `https://veziv-server-production.up.railway.app/update/${id}`,
      updatedData
    );
    getData();
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "https://veziv-server-production.up.railway.app/uploadImage",
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
