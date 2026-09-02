import { TopicNote } from "../../types";
import { getPhysics100Points } from "./physics100Points";
import { getChemistry100Points } from "./chemistry100Points";
import { getMaths100Points } from "./maths100Points";
import { getBiology100Points } from "./biology100Points";

/**
 * Enriches a TopicNote with at least 100 comprehensive high-yield points
 */
export const enrichNoteWith100Points = (note: TopicNote): TopicNote => {
  if (note.points100 && note.points100.length >= 100) {
    return note;
  }

  let generatedPoints = [];
  if (note.subject === "Physics") {
    generatedPoints = getPhysics100Points(note.id, note.chapter);
  } else if (note.subject === "Chemistry") {
    generatedPoints = getChemistry100Points(note.id, note.chapter);
  } else if (note.subject === "Mathematics") {
    generatedPoints = getMaths100Points(note.id, note.chapter);
  } else if (note.subject === "Biology") {
    generatedPoints = getBiology100Points(note.id, note.chapter);
  } else {
    generatedPoints = getPhysics100Points(note.id, note.chapter);
  }

  return {
    ...note,
    points100: generatedPoints,
  };
};

export const enrichAllTopicNotes = (notes: TopicNote[]): TopicNote[] => {
  return notes.map((note) => enrichNoteWith100Points(note));
};
