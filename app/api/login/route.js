import yaml from "js-yaml";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { email, password } = await req.json();
  const filePath = path.join(process.cwd(), "config.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents);

  const user = data.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ success: true, user }), { status: 200 });
}