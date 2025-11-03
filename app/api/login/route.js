import fs from "fs";
import yaml from "js-yaml";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Load config.yaml
    const fileContents = fs.readFileSync("config.yaml", "utf8");
    const config = yaml.load(fileContents);

    // Find matching user
    const user = config.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return new Response(
        JSON.stringify({ success: true, user }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error reading YAML:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
