import { TopicNote } from "../types";
import { PHYSICS_NOTES } from "./notes/physicsNotes";
import { CHEMISTRY_NOTES } from "./notes/chemistryNotes";
import { MATHS_NOTES } from "./notes/mathsNotes";
import { BIOLOGY_NOTES } from "./notes/biologyNotes";
import { enrichAllTopicNotes } from "./notes/points100Manager";

const RAW_NOTES: TopicNote[] = [
  ...PHYSICS_NOTES,
  ...CHEMISTRY_NOTES,
  ...MATHS_NOTES,
  ...BIOLOGY_NOTES,
];

// All topic notes enriched with at least 100 high-yield exam points each
export const TOPIC_NOTES_DATA: TopicNote[] = enrichAllTopicNotes(RAW_NOTES);

export { PHYSICS_NOTES, CHEMISTRY_NOTES, MATHS_NOTES, BIOLOGY_NOTES };
