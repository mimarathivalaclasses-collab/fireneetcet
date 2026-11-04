import fs from 'fs';
import path from 'path';

const directories = [
  'src/data',
  'src/data/notes'
];

const patternsToRemove = [
  /\s*"?pointMr"?:.*?,?\n/g,
  /\s*"?questionTextMr"?:.*?,?\n/g,
  /\s*"?explanationMr"?:.*?,?\n/g,
  /\s*"?optionsMr"?:\s*\[[\s\S]*?\],?\n/g,
  /\s*"?chapterMr"?:.*?,?\n/g,
  /\s*"?titleMr"?:.*?,?\n/g,
  /\s*"?summaryMr"?:.*?,?\n/g,
  /\s*"?pointsMr"?:\s*\[[\s\S]*?\],?\n/g,
  /\s*"?examTipMr"?:.*?,?\n/g,
  /\s*"?mistakeMr"?:.*?,?\n/g,
  /\s*"?correctionMr"?:.*?,?\n/g,
  /\s*"?syllabusCoverageMr"?:.*?,?\n/g,
  /\s*"?instructionsMr"?:\s*\[[\s\S]*?\],?\n/g,
  /\s*mr:\s*".*?"/g, // Specifically for { en: "...", mr: "..." }
  /,\s*mr:\s*".*?"/g,
  /\s*"?mr"?:\s*".*?"/g
];

function cleanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  if (!filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove common Mr fields
  patternsToRemove.forEach(pattern => {
    content = content.replace(pattern, (match) => {
        // If it's the mr: "..." pattern inside an object, handle comma carefully
        if (match.includes('mr:')) {
            return '';
        }
        return '\n';
    });
  });

  // 2. Remove Marathi text in parentheses in English strings
  content = content.replace(/\s*\([^\)]*[\u0900-\u097F][^\)]*\)/g, '');
  
  // 3. Remove specific variable assignments
  content = content.replace(/\s*let mr = .*?;/g, '');
  content = content.replace(/\s*mr = .*?;/g, '');
  content = content.replace(/\s*pointMr: mr,?/g, '');
  
  // 4. Targeted raw array fix for 100Points files
  if (filePath.includes('100Points.ts')) {
      // Find arrays like ["English", "Marathi", "Cat", "Formula"] and remove the Marathi part
      // This is a bit specific to how the file is structured
      content = content.replace(/\[\s*"(.*?)",\s*".*?[\u0900-\u097F].*?",/g, '["$1",');
  }

  // 5. Cleanup empty mr: "" if any left by previous replacements
  content = content.replace(/,\s*mr:\s*""/g, '');
  content = content.replace(/mr:\s*""/g, '');
  
  // 6. Fix trailing commas in objects if a Mr field was last
  content = content.replace(/,(\s*\})/g, '$1');

  // Cleanup double newlines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Cleaned ${filePath}`);
  }
}

directories.forEach(dir => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      cleanFile(fullPath);
    }
  });
});
