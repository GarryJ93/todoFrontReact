const titleCase = (s: string): string => {
  if (!s) return "";

  return s
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    )
    .join("\n");
};

export default titleCase;
