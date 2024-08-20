import useSWR from "swr";

export default function useTitle(subject: string | undefined) {
  const { data, isLoading, isValidating, error, mutate } = useSWR(
    subject ? ["/api/story/title", subject] : null,
    async ([url, subject]) => {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ subject }),
      });
      return (await resp.json()) as { message: string };
    },
    {
      revalidateOnFocus: false,
    },
  );

  return {
    title: data?.message,
    isLoading,
    isValidating,
    error,
    mutate,
  };
}
