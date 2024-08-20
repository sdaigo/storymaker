import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

const generateContentStream = async (title: string) => {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: async token => {
          await writer.ready;
          await writer.write(encoder.encode(token));
        },
        handleLLMEnd: async () => {
          await writer.ready;
          await writer.close();
        },
      },
    ],
  });

  const prompt = new PromptTemplate({
    inputVariables: ["title"],
    template: "Tell me a story titled {title}",
  });

  const chain = prompt.pipe(model);

  chain.invoke({ title });

  return stream;
};

export async function POST(req: Request) {
  const { title } = await req.json();

  const stream = await generateContentStream(title);

  return new NextResponse(stream.readable, {
    headers: {
      // keep communication channel open
      "content-type": "application/event-stream",
    },
  });
}
