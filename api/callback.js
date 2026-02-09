export default async function handler(req, res) {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "No code provided" });

    // Exchange code for access token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(400).json({ error: "Failed to get access token" });
    }
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const user = await userRes.json();
    const encodedUser = encodeURIComponent(JSON.stringify(user));
    res.redirect(`/?user=${encodedUser}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server crash", details: err.message });
  }
}
