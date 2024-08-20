import Prompt from "@/boundary/story/ui/prompt";
import { Container } from "@/styled-system/jsx";

export default function Home() {
  return (
    <main>
      <Container my={8}>
        <Prompt />
      </Container>
    </main>
  );
}
