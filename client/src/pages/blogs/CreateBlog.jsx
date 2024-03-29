/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadImagError, setUploadImageError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageURLs: [],
  });
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadImage = async () => {
    setLoading(true);

    if (files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploadImageError(null);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageURLs: formData.imageURLs.concat(urls),
        });
        setUploadImageError(false);
      } catch (err) {
        setUploadImageError("Image upload failed (2 mb max per image)");
      }
    } else if(files.length==0){

      setUploadImageError("select at least one image");
    } else{
      setUploadImageError("You can only upload up to six images");
    }

    setLoading(false);
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageref = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         
        },

        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageURLs.length < 1)
        return setError("you must upload at least 1 image");
      setSubmitLoading(true);
      setError(true);
      const res = await fetch("/api/blogs/createBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setSubmitLoading(false);
     
      if (data.success === false) {
        setUploadImageError(data.message);
      }
      else
       navigate("/blogs");
    } catch (error) {
      setError(error);
      setSubmitLoading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i) => i != index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="">
    <div className="flex flex-col md:flex-row mt-4 justify-center md:gap-x-7 text-white mb-20">
      <div className="flex flex-col w-full md:w-[40%] p-6">
        <h2 className="text-2xl font-semibold mb-4">List Your Item</h2>
  
        <label htmlFor="name" className="text-gray-400 mb-2">Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded bg-gray-700 text-white mb-4"
        />
  
        <label htmlFor="description" className="text-gray-400 mb-2">Description:</label>
        <textarea
          id="desc"
          onChange={handleChange}
          name="desc"
          required
          rows='6'
          className="p-3 border border-gray-300 rounded bg-gray-700 text-white mb-4"
        ></textarea>
  
        <div className="flex gap-4 mb-4">
          <input
            className="p-3 border border-gray-300 rounded w-full bg-gray-700 text-white"
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            id="images"
            accept="image/*"
            multiple
          />
          <button
            onClick={handleUploadImage}
            type="button"
            className="p-3 bg-green-600 text-white rounded hover:bg-green-700 uppercase disabled:opacity-70"
          >
            {loading ? "Uploading" : "Upload"}
          </button>
        </div>
        <p className="text-red-600 mb-4">{uploadImagError && uploadImagError}</p>
      </div>
  
      <div className="flex flex-col w-full md:w-[40%] p-6">
        <h3 className="text-2xl font-semibold mb-4">Images:</h3>
        <p className="text-gray-400 mb-4">
          The first image will be Cover (max 4)
        </p>
  
        {formData.imageURLs.length > 0 &&
          formData.imageURLs.map((url, index) => {
            return (
              <div
                key={url}
                className="flex items-center justify-between p-3 border mb-4"
              >
                <img
                  src={url}
                  alt="image"
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 uppercase"
                >
                  Delete
                </button>
              </div>
            );
          })}
  
        <button type="submit" className="bg-blue-600 text-white py-3 rounded-full text-center font-bold hover:bg-blue-700 uppercase mt-auto">
          {submitLoading ? "Creating..." : "Create Listing"}
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  </form>
  
  
  );
}
