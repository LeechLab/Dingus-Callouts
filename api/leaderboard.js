import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const repoOwner = "RickyDaRick";
    const repoName = "Dingus-Callouts";
    const path = "leaderboard.json";
    const token = process.env.GITHUB_TOKEN;
    if (req.method === "GET") {
      const getRes = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
        {
          headers: { Authorization: `token ${token}` },
        },
      );

      const fileData = await getRes.json();

      const content = JSON.parse(
        Buffer.from(fileData.content, "base64").toString(),
      );

      return res.status(200).json(content);
    }
    if (req.method === "POST") {
      const { userId, username, avatarUrl, mode, time } = req.body;

      if (!mode || time === undefined) {
        return res.status(400).json({ error: "Missing score data" });
      }

      const getRes = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
        {
          headers: { Authorization: `token ${token}` },
        },
      );

      const fileData = await getRes.json();

      const sha = fileData.sha;

      const content = JSON.parse(
        Buffer.from(fileData.content, "base64").toString(),
      );

      const existingIndex = content.findIndex(
        (e) => e.userId === userId && e.mode === mode,
      );

      if (existingIndex >= 0 && content[existingIndex].time <= time) {
        return res.status(200).json({ message: "Score not better" });
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

      const data = await putRes.json();

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
