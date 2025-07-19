const express = require("express");
const Jimp = require("jimp");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/fbpost", async (req, res) => {
  const imageUrl = req.query.image;
  const text = req.query.text || "";

  if (!imageUrl) return res.status(400).send("Missing image URL");

  try {
    const base = await Jimp.read("https://i.ibb.co/4wpSssT/518003935.jpg");
    const overlay = await Jimp.read(imageUrl);

    overlay.cover(400, 400);
    base.composite(overlay, 30, 100);

    if (text) {
      const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      base.print(
        font,
        30,
        520,
        {
          text: text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
          alignmentY: Jimp.VERTICAL_ALIGN_TOP,
        },
        400,
        100
      );
    }

    const buffer = await base.getBufferAsync(Jimp.MIME_JPEG);
    res.set("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating image");
  }
});

app.get("/", (req, res) => {
  res.send("📸 Facebook Post API → Try /fbpost?image={URL}&text={Your caption}");
});

app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));