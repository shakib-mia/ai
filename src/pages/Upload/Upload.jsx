// import Resizer from "react-image-file-resizer";
// import "./App.css";
import { useState } from "react";
import axios from "axios";
// import { fileAsUrl } from "./utils/fileAsUrl";
// import UploadThing from "uploadthing";

// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file, // the file from input
//       300, // width
//       300, // height
//       "JPEG", // compress format WEBP, JPEG, PNG
//       100, // quality
//       0, // rotation
//       (uri) => {
//         resolve(uri);
//       },
//       "file", // URI or base64, set 'file' to receive file object
//       200, // canvas width
//       200 // canvas height
//     );
//   });

function Upload() {
  const [oldImage, setOldImage] = useState({});
  const [newImage, setNewImage] = useState({});

  // const handleSubmit = async (event) => {
  //   // console.log(oldImage.name);
  //   event.preventDefault();
  //   setOldImage(event.target.file.files[0]);
  //   // console.log();

  //   const config = {
  //     headers: {
  //       "content-type": "application/x-www-form-urlencoded",
  //       "X-RapidAPI-Key": "7c53b078acmsh122d83ecbdece92p145375jsnca77b4f04b1d",
  //       "X-RapidAPI-Host": "ai-picture-upscaler.p.rapidapi.com",
  //     },
  //   };
  //   const formData = new FormData();

  //   formData.append("file", event.target.file.files[0]);

  //   const response = await axios.post(
  //     "https://ai-be-ap65.onrender.com/upload",
  //     formData
  //   );

  //   // console.log(data);

  //   const data = new URLSearchParams({
  //     image_url: response.data,
  //     scale: "2",
  //   });

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("file", e.target.file.files[0]);
    const formData = new FormData();
    formData.append("key", "42afc79fccd60ad9768d1aa145ddfaff");
    formData.append("image", e.target.file.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", formData)
      .then((result) => {
        // console.log("Success:", result);
        // alert("Image uploaded successfully! Image URL is: " + result.data.url);
        setOldImage(result.data.data.url);

        const encodedParams = new URLSearchParams();
        encodedParams.set("image_url", result.data.data.url);
        encodedParams.set("scale", "4");

        const options = {
          method: "POST",
          url: "https://ai-picture-upscaler.p.rapidapi.com/upscaler/v1/",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "7c53b078acmsh122d83ecbdece92p145375jsnca77b4f04b1d",
            "X-RapidAPI-Host": "ai-picture-upscaler.p.rapidapi.com",
          },
          data: encodedParams,
        };

        // try {
        axios.request(options).then(({ data }) => {
          setNewImage(data.result_url);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to upload image.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center h-screen"
    >
      <div>
        <input
          className="file:bg-blue-800 file:text-white file:outline-none file:border-0 file:cursor-pointer file:rounded-full file:px-3"
          type="file"
          name="file"
        />
        <button type="submit">submit</button>
      </div>

      {oldImage.length > 0 && (
        <div className="absolute w-screen h-screen left-0 top-0 backdrop-blur-lg">
          <div className="h-full flex justify-center items-center gap-10">
            <aside className="h-full flex items-center">
              <img
                // className="w-1/2 aspect-square"
                src={oldImage}
                alt=""
                className="w-auto h-5/6"
              />
              {/* 
              <a
                href={newImage}
                className="bg-blue-800 text-white px-6 py-2 rounded-full"
                onClick={() => setNewImage("")}
              >
                Download Image
              </a> */}
            </aside>

            {newImage.length > 0 ? (
              <aside className="h-full text-center flex flex-col justify-center">
                <img
                  // className="w-1/2 aspect-square"
                  src={newImage}
                  alt=""
                  className="mb-10 h-5/6"
                  // className="h-1/2"
                />

                <a
                  href={newImage}
                  className="bg-blue-800 text-white px-6 py-2 rounded-full"
                  onClick={() => setNewImage("")}
                >
                  Download Upscaled Image
                </a>
              </aside>
            ) : (
              <div className="w-1/2">Upscaling Image...</div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default Upload;
