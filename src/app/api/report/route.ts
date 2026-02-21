import { NextRequest, NextResponse } from "next/server";

const REPO = "Gcx44/citizenready";

export async function POST(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const { title, body } = await request.json();
  if (!title || !body) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ title, body, labels: ["question-report"] }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
  }

  const issue = await response.json();
  return NextResponse.json({ url: issue.html_url });
}
