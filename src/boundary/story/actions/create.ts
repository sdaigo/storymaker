"use server";

import { model } from "@/lib/openai";
import type { MessageContent } from "@langchain/core/messages";
import { PromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  inputVariables: ["subject"],
  template: "Tell me a story title about {subject}",
});

const chain = prompt.pipe(model);

export async function create(_: { message: MessageContent | undefined }, fd: FormData) {
  const subject = fd.get("subject")?.toString();

  const gptResponse = await chain.invoke({ subject });
  console.log("Generated story:", gptResponse);
  return {
    message: gptResponse.content,
  };
}
