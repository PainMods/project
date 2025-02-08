const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const rawUrl = "https://raw.githubusercontent.com/PainMods/count/main/Database.json";
const updateUrl = "https://api.github.com/repos/PainMods/count/contents/Database.json";
const token = "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";  // Ganti dengan token GitHub Anda

app.get("/get-count", async (req, res) => {
    try {
        const response = await axios.get(rawUrl);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data" });
    }
});

app.post("/update-count", async (req, res) => {
    try {
        const response = await axios.get(updateUrl, {
            headers: { Authorization: `token ${token}` },
        });

        const sha = response.data.sha;
        const data = JSON.parse(Buffer.from(response.data.content, "base64").toString());

        data.today += 1;
        data.allTime += 1;

        const updatedContent = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

        await axios.put(updateUrl, {
            message: "Update count",
            content: updatedContent,
            sha,
        }, {
            headers: { Authorization: `token ${token}` },
        });

        res.json({ message: "Data berhasil diperbarui", data });
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui data" });
    }
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
