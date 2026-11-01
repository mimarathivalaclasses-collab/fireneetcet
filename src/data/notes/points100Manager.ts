import { TopicNote } from "../../types";
import { getPhysics100Points } from "./physics100Points";
import { getChemistry100Points } from "./chemistry100Points";
import { getMaths100Points } from "./maths100Points";
import { getBiology100Points } from "./biology100Points";
import { getGuaranteed50Points } from "./deep50PointsGenerator";

/**
 * Enriches a TopicNote with at least 50 to 100 comprehensive high-yield points.
 * Guarantees that points 1-50 are authentic, high-yield, bilingual syllabus points.
 */
export const enrichNoteWith100Points = (note: TopicNote): TopicNote => {
  const deep50 = getGuaranteed50Points(note.id, note.chapter, note.subject);

  let full100 = [];
  if (note.subject === "Physics") {
    full100 = getPhysics100Points(note.id, note.chapter);
  } else if (note.subject === "Chemistry") {
    full100 = getChemistry100Points(note.id, note.chapter);
  } else if (note.subject === "Mathematics") {
    full100 = getMaths100Points(note.id, note.chapter);
  } else if (note.subject === "Biology") {
    full100 = getBiology100Points(note.id, note.chapter);
  } else {
    full100 = getPhysics100Points(note.id, note.chapter);
  }

  // Overlay the deep guaranteed 50 points so the first 50 points are always top-tier authentic
  const combined = [...deep50];
  // Add remaining points from full100 (51 to 100) if available
  for (let i = 50; i < full100.length; i++) {
    combined.push({
      ...full100[i],
      id: i + 1,
    });
  }

  return {
    ...note,
    points100: combined,
  };
};

export const enrichAllTopicNotes = (notes: TopicNote[]): TopicNote[] => {
  return notes.map((note) => enrichNoteWith100Points(note));
};

