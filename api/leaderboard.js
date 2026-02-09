import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "leaderboard.json");

// Helper: read leaderboard
function readLeaderboard() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper: write leaderboard
function writeLeaderboard(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (req.method === "GET") {
    // Serve the public leaderboard
    const leaderboard = readLeaderboard();
    return res.status(200).json(leaderboard);
  }

  if (req.method === "POST") {
    const { userId, username, avatarUrl, mode, time } = req.body;

    if (!mode || typeof time !== "number") {
      return res.status(400).json({ error: "Missing fields" });
    }

    const leaderboard = readLeaderboard();

    const existing = leaderboard.find(
      (e) => e.userId === userId && e.mode === mode,
    );

    if (!existing || time < existing.time) {
      const filtered = leaderboard.filter(
        (e) => !(e.userId === userId && e.mode === mode),
      );

      filtered.push({
        userId: userId || "guest-" + Math.random().toString(36).substr(2, 6),
        username: username || "Guest",
        avatarUrl: avatarUrl || null,
        mode,
        time,
      });

      writeLeaderboard(filtered);

      return res.status(200).json({ success: true });
    }

    return res
      .status(200)
      .json({ success: false, message: "Score not improved" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
