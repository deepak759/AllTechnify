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
    } else {
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
          console.log(progress);
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
      console.log(data)
      if (data.success === false) {
        setUploadImageError(data.message);
      }
       navigate("/");
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
console.log(formData)
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex  flex-col md:flex-row mt-20 justify-center md:gap-x-7 text-black mb-20 ">
        <div className="flex items-center justify-center bg-gray-900  w-[80%] md:w-[40%] flex-col">
          <p className="font-semibold ">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be Cover (max 4)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-200 rounded w-full"
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleUploadImage}
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg uppercase disabled:opacity-70"
            >
              {loading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-800">{uploadImagError && uploadImagError}</p>
        </div>

        <div className="w-[40%] flex flex-col">
          <h2>List your item</h2>

          <label htmlFor="name">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            required
          />

        
          <label htmlFor="description">Description:</label>
          <textarea
            id="desc"
            onChange={handleChange}
            name="desc"
          
            required
            rows='10'
          ></textarea>
{formData.imageURLs.length > 0 &&
            formData.imageURLs.map((url, index) => {
              return (
                <div
                  key={url}
                  className=" flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="image"
                    className="h-20 w-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 uppercase rounded-lg hover:opacity-95"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <button type="submit " className=" bg-blue-700">
            {submitLoading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </div>
    </form>
  );
}
