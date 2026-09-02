import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TestResultData, LanguageMode, Question, TopicNote } from "../types";

/**
 * Formats time in minutes and seconds
 */
export const formatTimeDisplay = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

/**
 * Creates a formatted HTML printable document and triggers browser print (window.print())
 * This guarantees 100% sharp vector quality with Devanagari Marathi script & math symbols.
 */
export const printTestResultReport = (result: TestResultData, language: LanguageMode = "bilingual") => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    // Fallback if popup blocked: directly print current window
    window.print();
    return;
  }

  const examLabel =
    result.exam === "NEET"
      ? "NEET (National Eligibility cum Entrance Test)"
      : result.exam === "JEE_MAIN"
      ? "JEE Main (Joint Entrance Examination)"
      : "MHT-CET (Maharashtra Common Entrance Test)";

  const dateStr = new Date(result.completedAt || Date.now()).toLocaleDateString("mr-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subjectRows = result.subjectBreakdown
    .map(
      (sub) => `
      <tr>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; font-weight: 700; color: #0f172a;">${sub.subject}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center;">${sub.totalQuestions}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #16a34a; font-weight: 700;">${sub.correct}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #dc2626; font-weight: 700;">${sub.wrong}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; color: #64748b;">${sub.unattempted}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #2563eb;">${sub.score} / ${sub.maxScore}</td>
        <td style="padding: 8px 10px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: ${
          sub.accuracy >= 70 ? "#16a34a" : sub.accuracy >= 40 ? "#d97706" : "#dc2626"
        };">${sub.accuracy}%</td>
      </tr>
    `
    )
    .join("");

  const questionCards = result.questions
    .map((q, idx) => {
      const userAns = result.userAnswers[q.id];
      const isCorrect = userAns === q.correctOption;
      const isUnattempted = userAns === undefined;
      const optLetters = ["A", "B", "C", "D"];

      const statusBadge = isCorrect
        ? '<span style="background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">✓ बरोबर (+4)</span>'
        : isUnattempted
        ? '<span style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">- न सोडवलेले (0)</span>'
        : '<span style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">✗ चुकीचे (-1)</span>';

      const optionsHtml = q.options
        .map((opt, optI) => {
          const letter = optLetters[optI];
          const isRightOpt = optI === q.correctOption;
          const isUserChoice = userAns === optI;

          let bg = "#f8fafc";
          let border = "#e2e8f0";
          let color = "#334155";
          let tag = "";

          if (isRightOpt) {
            bg = "#f0fdf4";
            border = "#86efac";
            color = "#166534";
            tag = ' <strong style="color: #15803d; font-size: 11px; margin-left: 6px;">[योग्य उत्तर ✓]</strong>';
          }
          if (isUserChoice && !isRightOpt) {
            bg = "#fef2f2";
            border = "#fca5a5";
            color = "#991b1b";
            tag = ' <strong style="color: #b91c1c; font-size: 11px; margin-left: 6px;">[तुमचे उत्तर ✗]</strong>';
          }

          const optMr = q.optionsMr && q.optionsMr[optI] ? `<div style="font-size: 11px; color: #64748b; margin-top: 2px;">(${q.optionsMr[optI]})</div>` : "";

          return `
            <div style="background: ${bg}; border: 1px solid ${border}; color: ${color}; padding: 7px 10px; border-radius: 6px; font-size: 12px; margin-bottom: 5px;">
              <strong>${letter}.</strong> ${opt} ${tag}
              ${optMr}
            </div>
          `;
        })
        .join("");

      return `
        <div style="page-break-inside: avoid; break-inside: avoid; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 8px;">
            <div>
              <strong style="font-size: 13px; color: #0f172a;">प्रश्न क्र. ${idx + 1}</strong>
              <span style="background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 8px; font-weight: 700;">${q.subject}</span>
              <span style="color: #64748b; font-size: 11px; margin-left: 6px;">• ${q.chapter}</span>
            </div>
            <div>${statusBadge}</div>
          </div>

          <div style="font-size: 13px; font-weight: 600; color: #0f172a; line-height: 1.5; margin-bottom: 6px;">
            ${q.questionText}
          </div>

          ${
            q.questionTextMr
              ? `<div style="background: #fffbeb; border: 1px solid #fef3c7; padding: 6px 9px; border-radius: 6px; font-size: 11.5px; color: #78350f; margin-bottom: 8px; line-height: 1.4;">
                  <strong>मराठी:</strong> ${q.questionTextMr}
                </div>`
              : ""
          }

          <div style="margin-bottom: 8px;">
            ${optionsHtml}
          </div>

          <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 8px 10px; border-radius: 4px; font-size: 11.5px; color: #1e293b;">
            <div style="font-weight: 700; color: #4338ca; margin-bottom: 3px;">💡 सविस्तर स्पष्टीकरण (Step-by-step Solution):</div>
            ${
              q.formula
                ? `<div style="background: #eef2ff; border: 1px solid #c7d2fe; padding: 3px 6px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #312e81; margin-bottom: 4px;">
                    <strong>सूत्र:</strong> ${q.formula}
                  </div>`
                : ""
            }
            <div style="line-height: 1.5;">${q.explanation}</div>
            ${
              q.explanationMr
                ? `<div style="color: #475569; font-size: 11px; border-top: 1px dashed #cbd5e1; padding-top: 4px; margin-top: 4px;">
                    <strong>मराठी:</strong> ${q.explanationMr}
                  </div>`
                : ""
            }
          </div>
        </div>
      `;
    })
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="mr">
    <head>
      <meta charset="UTF-8">
      <title>${result.exam}_Mock_Test_Result_${Date.now()}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 10mm;
        }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background-color: #ffffff;
          color: #0f172a;
          margin: 0;
          padding: 16px;
          font-size: 12px;
          line-height: 1.4;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header-box {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .header-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .header-sub {
          font-size: 12px;
          color: #475569;
          margin-top: 2px;
        }
        .score-box {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }
        .score-card {
          flex: 1;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #f8fafc;
          text-align: center;
        }
        .score-card .val {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }
        .score-card .lbl {
          font-size: 10.5px;
          color: #64748b;
          margin-top: 2px;
          font-weight: 600;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
          font-size: 11.5px;
        }
        th {
          background: #f1f5f9;
          color: #0f172a;
          padding: 7px 10px;
          border: 1px solid #cbd5e1;
          text-align: left;
          font-weight: 700;
        }
        .no-print {
          margin-bottom: 15px;
          padding: 10px 14px;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .page-break-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print">
        <span style="font-size: 12.5px; font-weight: 700; color: #0369a1;">
          📄 NEET • JEE • MHT-CET Mock Test निकाल व विश्लेषण PDF
        </span>
        <button onclick="window.print()" style="background: #0284c7; color: #ffffff; border: none; padding: 7px 14px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px;">
          🖨️ PDF सेव्ह करा / प्रिंट करा (Save as PDF)
        </button>
      </div>

      <div class="header-box">
        <div>
          <div class="header-title">NEET • JEE MAIN • MHT-CET MCQ PREP MASTER</div>
          <div class="header-sub">${examLabel} — <strong>${result.title}</strong></div>
          <div style="font-size: 11px; color: #64748b; margin-top: 3px;">तारीख: ${dateStr} • वेळ: ${formatTimeDisplay(result.timeTakenSeconds)}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10.5px; font-weight: 700; color: #64748b;">एकूण गुण (Total Score)</div>
          <div style="font-size: 22px; font-weight: 800; color: #2563eb;">${result.score} <span style="font-size: 13px; color: #64748b; font-weight: normal;">/ ${result.maxMarks}</span></div>
          <div style="font-size: 10.5px; font-weight: 700; color: #16a34a;">टक्केवारी: ${result.percentage}% • अचूकता: ${result.accuracy}%</div>
        </div>
      </div>

      <!-- Quick KPI Strip -->
      <div class="score-box">
        <div class="score-card">
          <div class="val" style="color: #16a34a;">${result.correct} / ${result.totalQuestions}</div>
          <div class="lbl">बरोबर उत्तरे (Correct)</div>
        </div>
        <div class="score-card">
          <div class="val" style="color: #dc2626;">${result.wrong}</div>
          <div class="lbl">चुकीची उत्तरे (Incorrect)</div>
        </div>
        <div class="score-card">
          <div class="val" style="color: #64748b;">${result.unattempted}</div>
          <div class="lbl">न सोडवलेले (Skipped)</div>
        </div>
        <div class="score-card">
          <div class="val" style="color: #2563eb;">${formatTimeDisplay(result.timeTakenSeconds)}</div>
          <div class="lbl">घेतलेला वेळ (Time Taken)</div>
        </div>
      </div>

      <!-- Subject Breakdown Table -->
      <h3 style="font-size: 12.5px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 8px;">
        विषयानुसार कामगिरी (Subject-wise Score Analysis)
      </h3>
      <table>
        <thead>
          <tr>
            <th>विषय (Subject)</th>
            <th style="text-align: center;">एकूण प्रश्न</th>
            <th style="text-align: center;">बरोबर</th>
            <th style="text-align: center;">चूक</th>
            <th style="text-align: center;">सोडवले नाहीत</th>
            <th style="text-align: center;">मिळालेले गुण</th>
            <th style="text-align: center;">अचूकता %</th>
          </tr>
        </thead>
        <tbody>
          ${subjectRows}
        </tbody>
      </table>

      <!-- Questions and Solutions -->
      <h3 style="font-size: 12.5px; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-top: 18px; margin-bottom: 10px; border-left: 3px solid #16a34a; padding-left: 8px;">
        सर्व प्रश्न, योग्य उत्तरे व सविस्तर स्पष्टीकरणे (Questions & Detailed Step Solutions)
      </h3>

      ${questionCards}

      <div style="margin-top: 24px; padding-top: 8px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 10.5px; color: #94a3b8;">
        NEET • JEE Main • MHT-CET सराव व मॉक टेस्ट प्लॅटफॉर्म • Generated via MCQ Prep Master
      </div>

      <script>
        // Trigger window.print() after rendering
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 350);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/**
 * Generates and downloads a direct PDF file using html2canvas & jsPDF
 */
export const downloadTestResultDirectPDF = async (
  elementId: string,
  fileName: string = "Mock_Test_Report.pdf",
  onProgress?: (msg: string) => void
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Report element not found");
  }

  if (onProgress) onProgress("PDF जनरेट होत आहे, कृपया थांबा...");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth - 10; // 5mm margins
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 5;

  pdf.addImage(imgData, "JPEG", 5, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + 5;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 5, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(fileName);
};

/**
 * Generates printable HTML & triggers window.print / PDF export for the Question Bank
 */
export const printQuestionsBankReport = (
  questions: Question[],
  examTitle: string = "All Exams Question Bank",
  language: LanguageMode = "bilingual"
) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.print();
    return;
  }

  const dateStr = new Date().toLocaleDateString("mr-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const questionCards = questions
    .map((q, idx) => {
      const optLetters = ["A", "B", "C", "D"];
      const isMr = language === "mr";
      const isEn = language === "en";
      const isBilingual = language === "bilingual";

      const optionsHtml = q.options
        .map((opt, optI) => {
          const letter = optLetters[optI];
          const isRightOpt = optI === q.correctOption;
          let bg = isRightOpt ? "#f0fdf4" : "#f8fafc";
          let border = isRightOpt ? "#86efac" : "#e2e8f0";
          let color = isRightOpt ? "#166534" : "#334155";
          let tag = isRightOpt
            ? ' <strong style="color: #15803d; font-size: 11px; margin-left: 6px;">[योग्य उत्तर ✓]</strong>'
            : "";

          const optMr =
            q.optionsMr && q.optionsMr[optI]
              ? `<div style="font-size: 11px; color: ${isRightOpt ? "#15803d" : "#64748b"}; margin-top: 2px;">(${q.optionsMr[optI]})</div>`
              : "";

          return `
            <div style="background: ${bg}; border: 1px solid ${border}; color: ${color}; padding: 6px 10px; border-radius: 6px; font-size: 12px; margin-bottom: 4px;">
              <strong>${letter}.</strong> ${opt} ${tag}
              ${optMr}
            </div>
          `;
        })
        .join("");

      return `
        <div style="page-break-inside: avoid; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
            <div style="font-size: 12px; font-weight: 800; color: #1e293b;">
              प्रश्न #${idx + 1} • <span style="color: #2563eb;">${q.subject}</span> • <span style="color: #475569;">${q.chapter}</span>
            </div>
            <div style="font-size: 10.5px; font-weight: 700; color: #64748b;">
              ${q.exam} | ${q.difficulty} ${q.pyqYear ? `• [${q.pyqYear}]` : ""}
            </div>
          </div>

          ${
            (isBilingual || isMr) && q.questionTextMr
              ? `<div style="font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 4px; line-height: 1.5;">${q.questionTextMr}</div>`
              : ""
          }

          ${
            (isBilingual || isEn || !q.questionTextMr)
              ? `<div style="font-size: 12.5px; color: ${isBilingual && q.questionTextMr ? "#475569" : "#0f172a"}; font-weight: ${isBilingual && q.questionTextMr ? "500" : "700"}; margin-bottom: 8px; font-style: ${isBilingual && q.questionTextMr ? "italic" : "normal"};">${q.questionText}</div>`
              : ""
          }

          <div style="margin-top: 8px;">
            ${optionsHtml}
          </div>

          ${
            q.formula
              ? `
              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 6px 10px; margin-top: 8px; font-size: 11.5px; color: #1e40af;">
                <strong>महत्त्वाचे सूत्र (Formula):</strong> <code style="font-family: monospace; font-weight: 700;">${q.formula}</code>
              </div>
            `
              : ""
          }

          ${
            q.explanationMr || q.explanation
              ? `
              <div style="background: #f8fafc; border-left: 3px solid #6366f1; padding: 8px 10px; margin-top: 6px; font-size: 11.5px; color: #334155; line-height: 1.45;">
                ${
                  q.explanationMr
                    ? `<div><strong style="color: #1e293b;">मराठी स्पष्टीकरण:</strong> ${q.explanationMr}</div>`
                    : ""
                }
                ${
                  q.explanation && (isBilingual || isEn)
                    ? `<div style="margin-top: 4px; color: #64748b;"><strong style="color: #475569;">English Explanation:</strong> ${q.explanation}</div>`
                    : ""
                }
              </div>
            `
              : ""
          }
        </div>
      `;
    })
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="mr">
    <head>
      <meta charset="UTF-8">
      <title>${examTitle}_Question_Bank_${Date.now()}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 10mm;
        }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        * {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background-color: #ffffff;
          color: #0f172a;
          margin: 0;
          padding: 16px;
          font-size: 12px;
          line-height: 1.4;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header-box {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .header-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .header-sub {
          font-size: 12px;
          color: #475569;
          margin-top: 2px;
        }
        .meta-badge {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="header-box">
        <div>
          <div class="header-title">📚 ${examTitle} — अधिकृत प्रश्नसंच व सविस्तर स्पष्टीकरणे</div>
          <div class="header-sub">MHT-CET • NEET • JEE Main सराव प्रश्न, अचूक पर्याय व पायरीनुसार स्पष्टीकरण PDF</div>
        </div>
        <div class="meta-badge">
          <div>एकूण प्रश्न: <strong>${questions.length}</strong></div>
          <div>दिनांक: ${dateStr}</div>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        ${questionCards}
      </div>

      <div style="margin-top: 24px; padding-top: 8px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 10.5px; color: #94a3b8;">
        NEET • JEE Main • MHT-CET सराव व मॉक टेस्ट प्लॅटफॉर्म • Generated via MCQ Prep Master
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 350);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/**
 * Generates comprehensive printable HTML & PDF export for Topic Notes & Revision Sheets
 */
export const printTopicNotesReport = (
  notes: TopicNote[],
  instituteName: string = "Mi Marathi Vala Classes",
  language: LanguageMode = "bilingual"
) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.print();
    return;
  }

  const dateStr = new Date().toLocaleDateString("mr-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const notesHtml = notes
    .map((note) => {
      const isMr = language === "mr";
      const isEn = language === "en";
      const isBilingual = language === "bilingual";

      const sectionsHtml = note.sections
        .map((sec) => {
          const pointsListHtml = sec.points
            .map((pt, ptIdx) => {
              const ptMr = sec.pointsMr && sec.pointsMr[ptIdx] ? sec.pointsMr[ptIdx] : "";
              return `
                <li style="margin-bottom: 6px; line-height: 1.5; color: #1e293b;">
                  ${
                    (isBilingual || isMr) && ptMr
                      ? `<div style="font-weight: 600; color: #0f172a;">${ptMr}</div>`
                      : ""
                  }
                  ${
                    (isBilingual || isEn || !ptMr)
                      ? `<div style="color: ${isBilingual && ptMr ? "#475569" : "#0f172a"}; font-size: 11.5px; margin-top: ${isBilingual && ptMr ? "2px" : "0"}; font-style: ${isBilingual && ptMr ? "italic" : "normal"};">${pt}</div>`
                      : ""
                  }
                </li>
              `;
            })
            .join("");

          return `
            <div style="margin-bottom: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
              <h3 style="margin: 0 0 8px 0; font-size: 13.5px; font-weight: 800; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
                ${isMr || isBilingual ? sec.titleMr : ""} ${isBilingual && sec.title !== sec.titleMr ? `• <span style="font-size: 12px; color: #475569; font-weight: 600;">${sec.title}</span>` : (!isMr ? sec.title : "")}
              </h3>

              <ul style="margin: 0 0 8px 0; padding-left: 18px; font-size: 12px;">
                ${pointsListHtml}
              </ul>

              ${
                sec.keyFormula
                  ? `
                  <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 6px 10px; margin-top: 6px; font-size: 11.5px; color: #1e40af;">
                    <strong>महत्त्वाचे सूत्र (Formula):</strong> <code style="font-family: monospace; font-weight: 700; color: #1d4ed8;">${sec.keyFormula}</code>
                  </div>
                `
                  : ""
              }

              ${
                sec.keyMnemonic
                  ? `
                  <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 6px; padding: 6px 10px; margin-top: 6px; font-size: 11.5px; color: #86198f;">
                    <strong>💡 मेमरी ट्रिक (Mnemonic):</strong> ${sec.keyMnemonic}
                  </div>
                `
                  : ""
              }

              ${
                sec.examTip
                  ? `
                  <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 6px 10px; margin-top: 6px; font-size: 11px; color: #854d0e;">
                    <strong>🎯 परीक्षेसाठी टीप (Exam Tip):</strong> ${isMr && sec.examTipMr ? sec.examTipMr : sec.examTip} ${isBilingual && sec.examTipMr ? `(${sec.examTip})` : ""}
                  </div>
                `
                  : ""
              }
            </div>
          `;
        })
        .join("");

      const formulasTableRows = note.keyFormulasTable
        .map(
          (f) => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 6px 10px; font-weight: 700; color: #1e293b; font-size: 11.5px;">${f.name}</td>
            <td style="padding: 6px 10px; font-family: monospace; font-weight: 700; color: #2563eb; font-size: 11.5px;">${f.formula}</td>
            <td style="padding: 6px 10px; color: #475569; font-size: 11px;">${f.description}</td>
          </tr>
        `
        )
        .join("");

      const mistakesRows = note.commonMistakesToAvoid
        .map(
          (m) => `
          <div style="background: #fff1f2; border-left: 3px solid #e11d48; padding: 6px 10px; border-radius: 4px; margin-bottom: 6px; font-size: 11px;">
            <div style="color: #9f1239; font-weight: 700;">❌ चूक (Common Mistake): ${isMr ? m.mistakeMr : m.mistake}</div>
            <div style="color: #15803d; font-weight: 700; margin-top: 2px;">✓ सुधारणा (Correction): ${isMr ? m.correctionMr : m.correction}</div>
          </div>
        `
        )
        .join("");

      return `
        <div style="page-break-inside: avoid; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 16px; margin-bottom: 24px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px;">
            <div>
              <span style="background: #e0e7ff; color: #3730a3; font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px;">
                ${note.subject}
              </span>
              <span style="background: #fee2e2; color: #991b1b; font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px; margin-left: 6px;">
                ${note.highYieldWeightage} Weightage
              </span>
              <h2 style="margin: 6px 0 2px 0; font-size: 16px; font-weight: 800; color: #0f172a;">
                ${note.chapterMr}
              </h2>
              <div style="font-size: 12px; color: #475569; font-style: italic;">
                ${note.title}
              </div>
            </div>
            <div style="text-align: right; font-size: 11px; font-weight: 700; color: #64748b;">
              Exams: ${note.exams.join(", ")}
            </div>
          </div>

          <div style="background: #f1f5f9; border-radius: 6px; padding: 8px 12px; margin-bottom: 12px; font-size: 12px; color: #334155;">
            <strong>प्रकरणाचा सारांश:</strong> ${isMr ? note.summaryMr : note.summary} ${isBilingual ? `<div style="margin-top: 2px; color: #64748b; font-size: 11px;">(${note.summary})</div>` : ""}
          </div>

          <div>
            ${sectionsHtml}
          </div>

          ${
            note.points100 && note.points100.length > 0
              ? `
              <div style="margin-top: 14px; margin-bottom: 14px; background: #faf5ff; border: 1.5px solid #d8b4fe; border-radius: 8px; padding: 12px;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 800; color: #6b21a8; border-bottom: 1px solid #e9d5ff; padding-bottom: 4px;">
                  💯 १०० अत्यंत महत्त्वाचे परीक्षा पॉईंट्स (100 High-Yield Exam Points)
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  ${note.points100
                    .map(
                      (p) => `
                    <div style="background: #ffffff; border: 1px solid #f3e8ff; border-radius: 6px; padding: 6px 8px; font-size: 10.5px; line-height: 1.4;">
                      <div style="font-weight: 700; color: #581c87;">
                        <span style="background: #e9d5ff; color: #581c87; border-radius: 3px; padding: 1px 4px; margin-right: 4px; font-size: 10px;">#${p.id}</span>
                        ${isMr || isBilingual ? p.pointMr : ""}
                      </div>
                      ${
                        (isBilingual || isEn) && p.point !== p.pointMr
                          ? `<div style="color: #64748b; margin-top: 2px; font-size: 10px;">${p.point}</div>`
                          : ""
                      }
                      ${
                        p.formula
                          ? `<div style="font-family: monospace; font-weight: 700; color: #2563eb; margin-top: 2px; font-size: 10px;">सूत्र: ${p.formula}</div>`
                          : ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
              : ""
          }

          ${
            note.keyFormulasTable.length > 0
              ? `
              <div style="margin-top: 12px; margin-bottom: 12px;">
                <h4 style="margin: 0 0 6px 0; font-size: 12.5px; font-weight: 800; color: #0f172a;">
                  ⚡ Quick Formula Reference Table
                </h4>
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; background: #ffffff;">
                  <thead>
                    <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
                      <th style="padding: 6px 10px; font-size: 11px; color: #475569;">नाव (Concept)</th>
                      <th style="padding: 6px 10px; font-size: 11px; color: #475569;">सूत्र (Formula)</th>
                      <th style="padding: 6px 10px; font-size: 11px; color: #475569;">वर्णन (Description)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${formulasTableRows}
                  </tbody>
                </table>
              </div>
            `
              : ""
          }

          ${
            note.commonMistakesToAvoid.length > 0
              ? `
              <div style="margin-top: 12px;">
                <h4 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 800; color: #9f1239;">
                  ⚠️ विद्यार्थ्यांकडून वारंवार होणाऱ्या चुका आणि सुधारणा (Avoid Common Traps)
                </h4>
                ${mistakesRows}
              </div>
            `
              : ""
          }
        </div>
      `;
    })
    .join("");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="mr">
    <head>
      <meta charset="UTF-8">
      <title>Quick_Revision_Topic_Notes_${Date.now()}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 10mm;
        }
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        * {
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
          background-color: #ffffff;
          color: #0f172a;
          margin: 0;
          padding: 16px;
          font-size: 12px;
          line-height: 1.4;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .header-box {
          border-bottom: 3px solid #4f46e5;
          padding-bottom: 12px;
          margin-bottom: 18px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .inst-name {
          font-size: 20px;
          font-weight: 900;
          color: #4338ca;
          letter-spacing: -0.5px;
        }
        .header-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          margin-top: 2px;
        }
        .header-sub {
          font-size: 11.5px;
          color: #64748b;
          margin-top: 2px;
        }
        .meta-badge {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="header-box">
        <div>
          <div class="inst-name">🎓 ${instituteName}</div>
          <div class="header-title">📖 उच्च-गुणवत्ता चॅप्टरनिहाय अभ्यास नोट्स आणि रिव्हिजन शीट्स (Quick Revision Notes PDF)</div>
          <div class="header-sub">MHT-CET • NEET • JEE Main महत्त्वाचे नियम, सूत्रे, मेमरी ट्रिक्स आणि प्रकरणांचा सराव</div>
        </div>
        <div class="meta-badge">
          <div>एकूण चॅप्टर्स: <strong>${notes.length}</strong></div>
          <div>दिनांक: ${dateStr}</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        ${notesHtml}
      </div>

      <div style="margin-top: 24px; padding-top: 10px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 11px; color: #64748b;">
        MHT-CET / NEET / JEE Main Study Material • ${instituteName} • Generated for Student Revision
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 350);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
