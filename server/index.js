const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/api", (req, res) => {
    console.log(req.body.seconds);
    res
        .status(202)
        .cookie(req.body.cookie_id, req.body.cookie_value, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(new Date().getTime() + req.body.seconds * 1000),
        })
        .json({ message: "Cookie Created!" });
  });

app.get("/send", (req, res) => {
    console.log(req.cookies);
    res
        .status(202)
        .json({ message: `Request Received with cookie value: ${JSON.stringify(req.cookies)}` });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});