import { useState,FC } from "react";
import { useThrottle } from "./throttle";
// import {Button} from "@repo/ui"

interface Favorite {
  result: string;
  reason: string;
}

const Homepage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const throttle = useThrottle(query);
  const [selectPKG, setSelectPKG] = useState<string>("");
  const [favReason, setFavReason] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  console.log("throttle",throttle)
  const handleSubmit = (): void => {
    // Validate if a package is selected
    if (!selectPKG) {
      setErrorMessage("Please select a package from the list.");
      return;
    }

    // Validate if a reason is provided
    if (!favReason.trim()) {
      setErrorMessage("Please enter a reason why this is your favorite.");
      return;
    }

    // Reset error message
    setErrorMessage("");

    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirmed: boolean): void => {
    // Hide the confirmation modal
    setShowConfirmationModal(false);

    // If user clicks "Yes," add the selected package to favorites
    if (confirmed) {
      // Get existing favorites from localStorage or initialize an empty array
      const existingFavorites: Favorite[] = JSON.parse(localStorage.getItem("favorites") || "[]");

      // Add the selected package and reason to the array
      const newFavorite: Favorite = {
        result: selectPKG,
        reason: favReason,
      };

      // Push the newFavorite object to the existing array
      existingFavorites.push(newFavorite);

      // Store the updated array in localStorage
      localStorage.setItem("favorites", JSON.stringify(existingFavorites));

      alert("Package added to favorites!");
    }
  };

  return (
    <div className="w-4/5 m-auto">
      <strong><Label text={"Search For NPM Packages"} /></strong>
      <input
        type="text"
        name=""
        className="mt-1 px-3 py-2 bg-white border border-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <strong><Label text={"Results"} /></strong>
      <div className="h-52 overflow-y-auto">
        {throttle?.map((pkg, i) => (
          <label key={i} className="block mb-2.5">
            <input
              type="radio"
              name="package"
              value={pkg.package.name}
              className="mr-1.5"
              onChange={(e) => setSelectPKG(e.target.value)}
              checked={selectPKG === pkg.package.name}
            />
            {pkg.package.name}
          </label>
        ))}
      </div>
      <br />
      <br />
      <strong><Label text={"why is this your Fav?"} /></strong>
      <textarea
        rows={4}
        cols={50}
        className="mt-1 px-3 py-2 bg-white border border-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        placeholder="Enter your text here..."
        value={favReason}
        onChange={(e) => setFavReason(e.target.value)}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex justify-end mt-5">
      <Button
        classname={
          "w-1/7 bg-violet-600 hover:bg-blue-300 px-3 py-1 border-0 rounded text-white"
        }
        text={"Submit"}
        handleSubmit={handleSubmit}
      />
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4">Are you sure you want to submit?</p>
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

export default Homepage;
