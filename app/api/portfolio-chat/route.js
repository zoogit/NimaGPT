import { readFile } from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

const knowledgePath = path.join(process.cwd(), "data", "profileKnowledge.json");

// This route runs on the server, so the OpenAI key never reaches the browser.
export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json({ error: "Please provide a question." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "The portfolio assistant is not configured yet." },
        { status: 500 }
      );
    }

    const profileKnowledge = JSON.parse(await readFile(knowledgePath, "utf8"));
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // The knowledge base is intentionally injected directly for the MVP.
    // A future RAG version can replace this block with retrieval results.
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are Nima's portfolio assistant. Answer only from the supplied portfolio knowledge base. Keep answers concise, professional, and useful to a recruiter, hiring manager, collaborator, or client. If the question is unrelated to Nima's work, skills, projects, leadership, software, or AI capabilities, politely redirect the visitor back to those topics. Do not invent facts, employers, dates, awards, clients, or project details that are not present in the knowledge base."
        },
        {
          role: "user",
          content: `Portfolio knowledge base:\n${JSON.stringify(
            profileKnowledge,
            null,
            2
          )}\n\nVisitor question: ${question}`
        }
      ]
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ||
      "I can answer questions about Nima's design leadership, projects, software skills, and AI workflows.";

    return Response.json({ answer });
  } catch (error) {
    console.error("Portfolio assistant error:", error);

    return Response.json(
      { error: "The portfolio assistant could not answer right now." },
      { status: 500 }
    );
  }
}
