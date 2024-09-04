import React, { useState, useEffect, useRef } from "react";

function generateAsciiArt(): string {
  const lines = [
    "      _     _                                                 ",
    "     (_)   | |                                                ",
    " _ __ _ ___| |__  _ __ _   _ _ __    ___ _ __   __ _  ___ ___ ",
    "| '__| |_  / '_ \\| '__| | | | '_ \\  / __| '_ \\ / _` |/ __/ _ \\",
    "| |  | |/ /| |_) | |  | |_| | | | |_\\__ \\ |_) | (_| | (_|  __/",
    "|_|  |_/___|_.__/|_|   \\__,_|_| |_(_)___/ .__/ \\__,_|\\___\\___|",
    "                                        | |                   ",
    "                                        |_|                   ",
  ];

  return lines.join("\n");
}
const AsciiComponent: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const asciiRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (asciiRef.current) {
        const containerWidth = asciiRef.current.offsetWidth;
        const longestLineLength = Math.max(
          ...generateAsciiArt()
            .split("\n")
            .map((line) => line.length),
        );
        const newFontSize = Math.floor(containerWidth / longestLineLength);
        setFontSize(Math.min(Math.max(newFontSize, 6), 16)); // Clamp font size between 6px and 16px
      }
    };

    handleResize(); // Initial sizing
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <pre
      ref={asciiRef}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: "1",
        whiteSpace: "pre",
        overflow: "hidden",
        fontFamily: "monospace",
        fontWeight: "900",
        color: "white",
        textShadow: "0 0 7px white",
      }}
    >
      {generateAsciiArt()}
    </pre>
  );
};

export default AsciiComponent;
