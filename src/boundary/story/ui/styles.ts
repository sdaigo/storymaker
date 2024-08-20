import { css } from "@/styled-system/css";

export const heading = css({
  fontSize: "2xl",
  fontWeight: "bold",
  lineHeight: "none",
  mb: 4,
});

export const description = css({
  lineHeight: "1.5",
});

export const select = css({
  fontSize: "md",
  border: "1px solid {colors.gray.200}",
  borderRadius: "sm",
  px: 2,
  py: 1,
  bg: "gray.100",
});

export const button = css({
  fontSize: "md",
  fontWeight: "bold",
  py: 2,
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  _hover: {},
  _focus: {
    outline: "none",
  },
});

export const story = css({
  lineHeight: "1.5",
  mb: 4,
});

export const title = css({
  fontSize: "xl",
  fontWeight: "bold",
  lineHeight: "none",
  my: 4,
});

export const paragraph = css({
  fontSize: "md",
  lineHeight: "1.6",
});
