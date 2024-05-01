import Resizer from "react-image-file-resizer";
import "./App.css";
import { useState } from "react";
import axios from "axios";

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

function App() {
  const [oldImage, setOldImage] = useState({});
  const [newImage, setNewImage] = useState({});

  const handleSubmit = async (event) => {
    // console.log(oldImage.name);
    event.preventDefault();
    setOldImage(event.target.file.files[0]);
    // console.log();

    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "7c53b078acmsh122d83ecbdece92p145375jsnca77b4f04b1d",
        "X-RapidAPI-Host": "ai-picture-upscaler.p.rapidapi.com",
      },
    };
    const formData = new FormData();

    formData.append("file", event.target.file.files[0]);

    const response = await axios.post("http://localhost:5000/upload", formData);

    // console.log(data);

    const data = new URLSearchParams({
      image_url: response.data,
      scale: "2",
    });

    axios
      .post(
        "https://ai-picture-upscaler.p.rapidapi.com/upscaler/v1/",
        data,
        config
      )
      .then(({ data }) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">submit</button>

      {/* {oldImage.name && newImage.name && (
        <div className="float-left">
          <img
            // className="w-1/2 aspect-square"
            src={URL.createObjectURL(oldImage)}
            alt=""
            className="inline-block"
          />
          <img
            // className="w-1/2 aspect-square"
            src={URL.createObjectURL(newImage)}
            alt=""
            className="inline-block"
          />
        </div>
      )} */}
    </form>
  );
}

export default App;
