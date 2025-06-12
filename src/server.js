import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003;
//get the file path from the url of the current module.
const __filename = fileURLToPath(import.meta.url);

//get the directory name from the file path
const __dirname = dirname(__filename);

//middleware
// Now we want to serve the /publid directory from the one level above
//tell express that to serve all the files from the public directory as the static file/assests. any request for the css file will be resolved to the public directory.

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

//this tells that where to find the public directory if we don't do this then it will search for the public directory in the src folder where it is not located so we will get error for doing so.

//Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(PORT, () => {
  console.log(`server has started at the port : ${PORT}`);
});
