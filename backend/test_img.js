fetch('http://localhost:5000/uploads/1783233466945-165106-snow-3066167_1920.jpg')
  .then(res => {
    console.log("Status:", res.status);
    console.log("Headers:", res.headers);
  })
  .catch(err => console.error(err));
