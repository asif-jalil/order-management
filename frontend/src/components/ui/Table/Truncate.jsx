import { Flex, Text, Tooltip } from "@mantine/core";
import { useState } from "react";

const Truncate = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 50;

  if (!text) {
    return "---";
  }

  const truncatedText =
    text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;

  return (
    <Flex direction="column" justify="flex-start" align="flex-start">
      <Tooltip label={text} disabled={text.length <= 50}>
        <Text
          size="sm"
          lineClamp={isExpanded ? undefined : 2} // Handles truncation when collapsed
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            cursor: text.length > maxChars ? "pointer" : "default",
            display: "inline-block",
          }}
        >
          {isExpanded ? text : truncatedText}
        </Text>
      </Tooltip>
      {text.length > 50 && (
        <button
          style={{
            margin: 0,
            color: "#007BFF",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            padding: 0,
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </Flex>
  );
};

export default Truncate;
