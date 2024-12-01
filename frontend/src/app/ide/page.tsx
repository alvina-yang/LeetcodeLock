"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "../components/ui/moving-boarder";
import axios from "axios";
import { SidebarDemo } from "../components/SidebarDemo";

// Custom theme for MUI components
const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#292524",
          color: "white",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#3f3f46",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#3f3f46",
          },
          "&:hover": {
            backgroundColor: "#3f3f46",
          },
        },
      },
    },
  },
});

export default function CodeEditorPage() {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stdin, setStdin] = useState<string>(""); // For custom input

  // Hardcoded question details
  const question = {
    title: "Two Sum",
    text: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. 
You may assume that each input would have exactly one solution, and you may not use the same element twice. 
You can return the answer in any order.`,
    difficulty: "Easy", // Change as needed: Easy, Medium, or Hard
  };

  // Determine difficulty color based on the difficulty level
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-orange-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-gray-400"; // Default color for unknown difficulties
    }
  };

  const getLanguageId = (lang: string): number => {
    const languageMap: { [key: string]: number } = {
      javascript: 63, // JavaScript (Node.js 12.14.0)
      python: 71,     // Python (3.8.1)
      java: 62,       // Java (OpenJDK 13.0.1)
      csharp: 51,     // C# (C#)
      cpp: 54,        // C++ (GCC 9.2.0)
      typescript: 74, // TypeScript (Node.js)
    };
    return languageMap[lang] || 63; // Default to JavaScript if not found
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleCompile = async () => {
    setLoading(true);
    setOutput(null);
    setError(null);

    const RAPID_API_URL = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
    const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;
    const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

    if (!RAPID_API_URL || !RAPID_API_HOST || !RAPID_API_KEY) {
      setError("Configuration error: Missing API credentials.");
      setLoading(false);
      return;
    }

    try {
      const submissionData = {
        language_id: getLanguageId(language),
        source_code: btoa(code),
        stdin: btoa(stdin || ""),
      };

      const options = {
        method: "POST",
        url: RAPID_API_URL,
        params: { base64_encoded: "true", wait: "false", fields: "*" },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": RAPID_API_HOST,
          "X-RapidAPI-Key": RAPID_API_KEY,
        },
        data: submissionData,
      };

      const response = await axios.request(options);
      const token = response.data.token;
      const result = await pollSubmission(token);

      if (result.status.id === 3) {
        setOutput(atob(result.stdout || ""));
      } else if (result.status.id === 6) {
        setError(atob(result.compile_output || "Compilation Error"));
      } else if (result.status.id === 5) {
        setError("Time Limit Exceeded");
      } else {
        setError(atob(result.stderr || "An error occurred"));
      }
    } catch (err: any) {
      setError(`Error: ${err.message || "An error occurred during execution."}`);
    } finally {
      setLoading(false);
    }
  };

  const pollSubmission = async (token: string): Promise<any> => {
    const maxAttempts = 10;
    const RAPID_API_URL = process.env.NEXT_PUBLIC_RAPIDAPI_URL;
    const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;
    const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        const options = {
          method: "GET",
          url: `${RAPID_API_URL}/${token}`,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": RAPID_API_HOST,
            "X-RapidAPI-Key": RAPID_API_KEY,
          },
        };

        const response = await axios.request(options);
        const result = response.data;

        if (result.status.id === 1 || result.status.id === 2) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          return result;
        }
      } catch (error) {
        throw new Error("Failed to retrieve submission status.");
      }
    }

    throw new Error("Code execution timed out.");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-full flex relative">
        {/* Main editor section */}
        <div className="w-1/2 h-full flex flex-col">
          <div className="flex justify-between p-3 bg-zinc-800 text-white">
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="language-select-label" sx={{ color: "white" }}>
                Language
              </InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                onChange={handleLanguageChange}
                sx={{ color: "white" }}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="typescript">TypeScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
              </Select>
            </FormControl>
            <div className="w-20 flex items-center">
              <Button
                className="bg-zinc-900"
                onClick={handleCompile}
                disabled={loading}
              >
                {loading ? "Running..." : "Run"}
              </Button>
            </div>
          </div>

          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Output and Question Display */}
        <div className="w-1/2 bg-zinc-900 p-4 overflow-y-auto">
          {/* Question Section */}
          <div className="mb-6">
            <h2 className="text-xl text-gray-200 font-bold">{question.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              Difficulty:{" "}
              <span className={`font-semibold ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty}
              </span>
            </p>
            <pre className="bg-zinc-800 text-gray-300 p-4 rounded whitespace-pre-wrap">
              {question.text}
            </pre>
          </div>

          {/* Output Section */}
          <h1 className="text-xl text-white mb-4">Output</h1>
          {loading && <p className="text-white">Executing...</p>}
          {error && <pre className="text-red-500">{error}</pre>}
          {output && <pre className="text-green-500">{output}</pre>}
        </div>
      </div>

    </ThemeProvider>
  );
}
