import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/images", async (req, res) => {
  console.log("req.query");
  const { tags } = req.query;
  const url = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1${
    tags ? `&tags=${tags}` : ""
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
