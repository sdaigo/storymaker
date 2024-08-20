"use client";

import { create } from "@/boundary/story/actions/create";
import { Box, VStack } from "@/styled-system/jsx";
import type { MessageContent } from "@langchain/core/messages";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate story"}
    </button>
  );
}

export default function Prompt() {
  const [title, formAction] = useFormState<{ message: MessageContent | undefined }, FormData>(
    create,
    {
      message: undefined,
    },
  );

  return (
    <VStack>
      <h1>🦄 The Story Maker</h1>
      <p>Generate a story for kids.</p>
      <form action={formAction}>
        <VStack>
          <label htmlFor="subject">Main subject of the story:</label>
          <select id="subject" name="subject">
            <option value="cats">Cats</option>
            <option value="unicorns">Unicorns</option>
            <option value="elfs">Elfs</option>
          </select>
          <Submit />
        </VStack>
      </form>
      {title.message && <button type="button">💫 {title.message as string}</button>}
    </VStack>
  );
}
