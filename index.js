const express = require("express");

const port = 3000
const app = express();

app.get("/", (req, res) => {
    console.log(`Server recieved get request: ${req.headers["test"]}`);
    res.send({ "message": "Hello World!"});
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})