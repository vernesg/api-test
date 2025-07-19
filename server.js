const express = require("express");
const Jimp = require("jimp");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/fbpost", async (req, res) => {
  const text = req.query.text || "Sample Facebook Post";

  try {
    const base = await Jimp.read("https://i.ibb.co/4wpSssT/518003935.jpg");

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

    const buffer = await base.getBufferAsync(Jimp.MIME_JPEG);
    res.set("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating image");
  }
});

app.get("/", (req, res) => {
  res.send("🧾 Facebook Billboard API → Use /fbpost?text=Your Message");
});

app.listen(PORT, () => console.log(`✅ Billboard API running on http://localhost:${PORT}`));