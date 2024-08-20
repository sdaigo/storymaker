"use client";

import { Box, HStack, VStack } from "@/styled-system/jsx";
import { useState } from "react";
import useTitle from "../actions/use-title";
import * as styles from "./styles";

export default function Prompt() {
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [story, setStory] = useState<string | undefined>(undefined);

  const { title, isValidating } = useTitle(subject);

  const startStoryStream = async () => {
    setStory("");
    const resp = await fetch("/api/story/content", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const reader = resp.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      setStory(prev => prev + chunk);
    }
  };

  return (
    <VStack alignItems="flex-start" w="2/3">
      <h1 className={styles.heading}>🦄 The Story Maker</h1>
      <p className={styles.description}>Generate a story for kids.</p>
      <HStack>
        <label htmlFor="subject">Main subject of the story:</label>
        <select
          id="subject"
          name="subject"
          className={styles.select}
          onChange={ev => {
            setSubject(ev.target.value);
            setStory("");
          }}
        >
          <option value="">Select Subject</option>
          <option value="cats">Cats</option>
          <option value="unicorns">Unicorns</option>
          <option value="elfs">Elfs</option>
        </select>
      </HStack>
      {title && (
        <Box className={styles.story}>
          <h2 className={styles.title}>{isValidating ? "Generating..." : title}</h2>
          <button className={styles.button} type="button" onClick={startStoryStream}>
            Tell me the story 💫
          </button>
          <p className={styles.paragraph}>{story}</p>
        </Box>
      )}
    </VStack>
  );
}
