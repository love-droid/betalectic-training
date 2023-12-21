import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye, faEyeSlash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface FavoriteItem {
  result: string;
  reason: string;
  isVisible: boolean;
  isEditing: boolean;
}

const Favourite: FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [_, setEditingIndex] = useState<number | null>(null);
  const [updatedReason, setUpdatedReason] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites: FavoriteItem[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favoritesWithFeatures = storedFavorites.map(fav => ({ ...fav, isVisible: false, isEditing: false }));
    setFavorites(favoritesWithFeatures);
  }, []);

  const handleDelete = (index: number): void => {
    setDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleToggleVisibility = (index: number): void => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].isVisible = !updatedFavorites[index].isVisible;
    setFavorites(updatedFavorites);
  };

  const handleToggleEditing = (index: number): void => {
    setEditingIndex(index);
    setUpdatedReason(favorites[index].reason);
    const updatedFavorites = [...favorites];
    updatedFavorites[index].isEditing = !updatedFavorites[index].isEditing;
    setFavorites(updatedFavorites);
  };

  const handleEditConfirm = (index: number): void => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index].reason = updatedReason;
    updatedFavorites[index].isEditing = false;
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setEditingIndex(null);
  };

  // const handleEditCancel = (index: number): void => {
  //   const updatedFavorites = [...favorites];
  //   updatedFavorites[index].isEditing = false;
  //   setFavorites(updatedFavorites);
  //   setEditingIndex(null);
  // };

  const handleConfirmation = (confirmed: boolean): void => {
    setShowDeleteConfirmation(false);
    if (confirmed) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(deleteIndex!, 1);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setShowDeleteConfirmation(false);
      alert("Package deleted successfully");
    } else {
      setShowDeleteConfirmation(false);
      setDeleteIndex(null);
    }
  };

  const handleSubmit = (): void => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between m-16 py-1 align-middle w-4/5 mx-auto">
        <h1>Welcome to Favourite NPM Packages</h1>
        <Button
          classname={
            "w-1/7 bg-blue-600 hover:bg-blue-500 px-3 py-1 border-0 rounded text-white"
          }
          text={"Add Fav"}
          handleSubmit={handleSubmit}
        />
      </div>
      <ul className="border border-black w-80% m-16 py-1 w-4/5 mx-auto">
        <div className="flex justify-around">
          <li><strong>Package name</strong></li>
          <li><strong>Actions</strong></li>
        </div>
        {favorites.map((fav, index) => (
          <li key={index} className="flex items-center justify-between border-b border-gray-300 p-4">
            <span className="max-w-sm mx-64">{fav.result}</span>
            <div className="flex items-center justify-end space-x-4 border mx-56 gap-2">
              <FontAwesomeIcon
                icon={fav.isVisible ? faEyeSlash : faEye}
                onClick={() => handleToggleVisibility(index)}
                className="cursor-pointer"
                title={fav.isVisible ? "Hide Reason" : "Show Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faCheck : faEdit}
                onClick={() => (fav.isEditing ? handleEditConfirm(index) : handleToggleEditing(index))}
                className="cursor-pointer"
                title={fav.isEditing ? "Confirm Edit" : "Edit Reason"}
              />
              <FontAwesomeIcon
                icon={fav.isEditing ? faTimes : faTrash}
                onClick={() => handleDelete(index)}
                className="cursor-pointer"
                title={fav.isEditing ? "Cancel Edit" : "Delete"}
              />
            </div>
            {fav.isVisible && (
              <div className="absolute left-1/4 mt-2 p-2 mx-80 bg-white border border-gray-300 rounded-md">
                <strong>Fav Reason:</strong> {fav.reason}
              </div>
            )}
            {fav.isEditing && (
              <div className="absolute left-1/4 mt-2 p-2 bg-white border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={updatedReason}
                  onChange={(e) => setUpdatedReason(e.target.value)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Are you sure you want to delete this package?</p>
            <div className="flex justify-between">
              <Button
                text="Yes"
                handleSubmit={() => handleConfirmation(true)}
                classname="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              />
              <Button
                text="No"
                handleSubmit={() => handleConfirmation(false)}
                classname="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
