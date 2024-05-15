export const fileAsUrl = (file) => {
  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     resolve(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     reject(error);
  //   };
  // });
  const formData = new FormData();
  formData.append("file", file);
  fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
