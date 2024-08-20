import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const generateTitle = async (subject: string) => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
  });

  const prompt = new PromptTemplate({
    inputVariables: ["subject"],
    template: "Tell me a story title about {subject}",
  });

  const chain = prompt.pipe(model);
  const gptResponse = await chain.invoke({ subject });
  return gptResponse.content;
};

export async function POST(req: Request) {
  const { subject } = await req.json();
  const message = await generateTitle(subject);

  return Response.json({
    message,
  });
}
