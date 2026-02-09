let leaderboard = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, username, time } = req.body;

    // Save or update user time
    const existing = leaderboard.find((u) => u.id === id);
    if (existing) {
      if (time < existing.time) existing.time = time; // Only save best time
    } else {
      leaderboard.push({ id, username, time });
    }

    leaderboard.sort((a, b) => a.time - b.time); // Sort by fastest
    res.status(200).json({ leaderboard });
  } else if (req.method === "GET") {
    res.status(200).json({ leaderboard });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
