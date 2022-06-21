require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const error = require("./middlewares/errors");
const { createServer } = require("http");
const { Server } = require("socket.io");

connectDB();
const app = express();
const httpServer = createServer(app); 
/* const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
}); */
app.enable("trust proxy");

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:3000" ],
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      credentials: true,
    })
  );

//routes
app.use("/api/artist", require("./routes/artist"));
app.use("/api/producer", require("./routes/producer"));
app.use("/api/album", require("./routes/album"));
app.use("/api/track", require("./routes/track"));


app.use(error);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const PORT = process.env.PORT || 4000;
const server = httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting Down the server due to Unhandled Promise rejection");
    server.close(() => {
      process.exit(1);
    });
  });