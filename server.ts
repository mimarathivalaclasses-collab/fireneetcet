import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Generate customized exam questions using Gemini API
  app.post("/api/gemini/generate-questions", async (req, res) => {
    try {
      const {
        exam = "NEET",
        subject = "Physics",
        chapter = "All Chapters",
        difficulty = "Medium",
        language = "bilingual", // 'bilingual' | 'mr' | 'en'
        count = 5,
        questionType = "concept_and_numerical",
      } = req.body;

      const prompt = `You are a master entrance exam question creator for Indian competitive exams (${exam} for ${subject}).
Create ${count} high-quality, authentic Multiple Choice Questions (MCQs) for:
- Exam: ${exam} (Strictly adhere to latest NTA NEET / JEE Main / Maharashtra State MHT-CET syllabus and difficulty patterns)
- Subject: ${subject}
- Chapter/Topic: ${chapter}
- Difficulty Level: ${difficulty} (Easy, Medium, Hard/Exam-level)
- Question Nature: ${questionType} (Include conceptual, numerical, and assertion-reason or application questions typical for this exam)
- Language Requirement: ${
        language === "bilingual"
          ? "Provide both English AND Marathi translation for questionText, options, and explanations."
          : language === "mr"
          ? "Provide Marathi questionText, options, and explanations (with key technical terms in English brackets)."
          : "Provide English questionText, options, and explanations."
      }

Ensure:
1. Exactly 4 clear options (A, B, C, D) with exactly one correct option.
2. The 'correctOption' index MUST be 0 for Option A, 1 for Option B, 2 for Option C, or 3 for Option D.
3. Detailed step-by-step solution explaining the core formula, laws, calculation steps, and why other options are incorrect.
4. Formula used clearly identified if applicable.
5. High scientific and mathematical accuracy.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are an expert professor and question setter for NEET, JEE Main, and MHT-CET. You provide precise, error-free MCQs in English and Marathi with thorough step-by-step explanations.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                questionText: {
                  type: Type.STRING,
                  description: "Question statement in English",
                },
                questionTextMr: {
                  type: Type.STRING,
                  description: "Question statement in Marathi",
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "4 options in English (A, B, C, D)",
                },
                optionsMr: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "4 options in Marathi (A, B, C, D)",
                },
                correctOption: {
                  type: Type.INTEGER,
                  description: "Index of correct option (0, 1, 2, or 3)",
                },
                explanation: {
                  type: Type.STRING,
                  description: "Detailed step-by-step explanation in English",
                },
                explanationMr: {
                  type: Type.STRING,
                  description: "Detailed step-by-step explanation in Marathi",
                },
                formula: {
                  type: Type.STRING,
                  description: "Key formula or rule used (e.g., F = ma, PV = nRT, I = mr^2)",
                },
                topic: {
                  type: Type.STRING,
                  description: "Specific sub-topic within the chapter",
                },
                difficulty: {
                  type: Type.STRING,
                  description: "Easy, Medium, or Hard",
                },
              },
              required: ["questionText", "options", "correctOption", "explanation"],
            },
          },
        },
      });

      const rawJson = response.text ? response.text.trim() : "[]";
      const questionsData = JSON.parse(rawJson);

      // Add unique IDs and metadata
      const formattedQuestions = questionsData.map((q: any, index: number) => ({
        id: `ai_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`,
        exam,
        subject,
        chapter: chapter === "All Chapters" ? (q.topic || "Core Syllabus") : chapter,
        topic: q.topic || chapter,
        difficulty: q.difficulty || difficulty,
        questionText: q.questionText,
        questionTextMr: q.questionTextMr || q.questionText,
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["Option A", "Option B", "Option C", "Option D"],
        optionsMr: Array.isArray(q.optionsMr) && q.optionsMr.length === 4 ? q.optionsMr : q.options,
        correctOption: typeof q.correctOption === "number" && q.correctOption >= 0 && q.correctOption <= 3 ? q.correctOption : 0,
        explanation: q.explanation || "No explanation provided.",
        explanationMr: q.explanationMr || q.explanation,
        formula: q.formula || "",
        isAiGenerated: true,
        createdAt: Date.now(),
      }));

      res.json({
        success: true,
        count: formattedQuestions.length,
        questions: formattedQuestions,
      });
    } catch (error: any) {
      console.error("Error generating questions:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI questions",
      });
    }
  });

  // AI Doubt Solver / Clarification Assistant
  app.post("/api/gemini/explain-doubt", async (req, res) => {
    try {
      const {
        questionText,
        options,
        correctOption,
        userSelectedOption,
        studentQuery,
        language = "bilingual",
      } = req.body;

      const prompt = `You are a supportive, knowledgeable Indian entrance exam tutor helping a student with NEET/JEE/MHT-CET.
Question: "${questionText}"
Options:
${options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}: ${opt}`).join("\n")}

Correct Answer: Option ${String.fromCharCode(65 + correctOption)} (${options[correctOption]})
Student's Chosen Option: ${userSelectedOption !== undefined ? `Option ${String.fromCharCode(65 + userSelectedOption)} (${options[userSelectedOption]})` : "Not attempted"}
Student's Doubt / Request: "${studentQuery || "Explain the concept, why my chosen answer is incorrect, and give a memory tip."}"

Provide:
1. Clear conceptual explanation in simple ${language === "mr" ? "Marathi" : language === "bilingual" ? "Bilingual (Marathi & English)" : "English"}.
2. Step-by-step breakdown of the right approach.
3. Common mistake alert (काय चूक होते?)
4. Quick revision formula or shortcut trick (ट्रिक / सूत्र).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are a friendly, encouraging entrance exam expert mentor for Marathi & Indian students preparing for NEET, JEE Main, and MHT-CET. Be concise, mathematically accurate, and provide crystal-clear insights.",
        },
      });

      res.json({
        success: true,
        explanation: response.text,
      });
    } catch (error: any) {
      console.error("Error explaining doubt:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to explain doubt",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
