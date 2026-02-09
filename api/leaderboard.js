import fetch from "node-fetch";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPO;
const filePath = "leaderboard.json"; // path in your repo
const branch = "main"; // or your default branch

async function getFile() {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`,
    {
      headers: { Authorization: `token ${token}` },
    }
  );
  const data = await res.json();
  return data;
}

async function updateFile(content, sha) {
  const body = {
    message: "Update leaderboard",
    content: Buffer.from(JSON.stringify(content, null, 2)).toString(
      "base64"
    ),
    sha,
    branch,
  };

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: { Authorization: `token ${token}` },
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export default async function handler(req, res) {
  try {
    const fileData = await getFile();
    const leaderboard = JSON.parse(Buffer.from(fileData.content, "base64"));

    if (req.method === "GET") {
      // just return leaderboard
      return res.status(200).json(leaderboard);
    }

    if (req.method === "POST") {
      const { userId, username, avatarUrl, mode, time } = req.body;

      if (!mode || typeof time !== "number") {
        return res.status(400).json({ error: "Missing fields" });
      }

      const existing = leaderboard.find(
        (e) => e.userId === userId && e.mode === mode
      );

      if (!existing || time < existing.time) {
        const filtered = leaderboard.filter(
          (e) => !(e.userId === userId && e.mode === mode)
        );

        filtered.push({
          userId: userId || "guest-" + Math.random().toString(36).substr(2, 6),
          username: username || "Guest",
          avatarUrl: avatarUrl || null,
          mode,
          time,
        });

        const updateRes = await updateFile(filtered, fileData.sha);

        return res.status(200).json({ success: true, updateRes });
      }

      return res.status(200).json({ success: false, message: "Score not improved" });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
