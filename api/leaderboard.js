import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { userId, username, avatarUrl, mode, time } = req.body;

    const repoOwner = "YOUR_GITHUB_USERNAME";
    const repoName = "YOUR_PUBLIC_REPO";
    const path = "leaderboard.json";
    const token = process.env.GITHUB_TOKEN;
    const getRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
    );
    if (!getRes.ok) {
      const text = await getRes.text();
      console.error("GET file failed:", getRes.status, text);
      return res.status(500).json({ error: "Failed to get leaderboard file" });
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;
    const content = JSON.parse(
      Buffer.from(fileData.content, "base64").toString(),
    );
    const existingIndex = content.findIndex(
      (e) => e.userId === userId && e.mode === mode,
    );
    if (existingIndex >= 0 && content[existingIndex].time <= time) {
      return res
        .status(200)
        .json({ message: "Score not better than existing" });
    }

    if (existingIndex >= 0) content.splice(existingIndex, 1);
    content.push({ userId, username, avatarUrl, mode, time });

    const putRes = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update leaderboard",
          content: Buffer.from(JSON.stringify(content, null, 2)).toString(
            "base64",
          ),
          sha,
        }),
      },
    );

    if (!putRes.ok) {
      const text = await putRes.text();
      console.error("PUT file failed:", putRes.status, text);
      return res.status(500).json({ error: "Failed to update leaderboard" });
    }

    const data = await putRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Unhandled error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
