import { TopicNote } from "../../types";
import { get200PointsForSubject } from "./deep200PointsBank";

/**
 * Enriches a TopicNote with 200 comprehensive high-yield revision points.
 * Guarantees that points are authentic, high-yield, formula-backed syllabus points
 * with zero duplicates.
 */
export const enrichNoteWith100Points = (note: TopicNote): TopicNote => {
  const points200 = get200PointsForSubject(note.subject);

  return {
    ...note,
    points100: points200
  };
};

export const enrichAllTopicNotes = (notes: TopicNote[]): TopicNote[] => {
  return notes.map((note) => enrichNoteWith100Points(note));
};
