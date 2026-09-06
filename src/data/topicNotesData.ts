import { TopicNote } from "../types";
import { PHYSICS_NOTES } from "./notes/physicsNotes";
import { PHYSICS_NOTES_ADDED } from "./notes/physicsNotesAdded";
import { CHEMISTRY_NOTES } from "./notes/chemistryNotes";
import { CHEMISTRY_NOTES_ADDED } from "./notes/chemistryNotesAdded";
import { MATHS_NOTES } from "./notes/mathsNotes";
import { MATHS_NOTES_ADDED } from "./notes/mathsNotesAdded";
import { BIOLOGY_NOTES } from "./notes/biologyNotes";
import { BIOLOGY_NOTES_ADDED } from "./notes/biologyNotesAdded";
import { enrichAllTopicNotes } from "./notes/points100Manager";

const ALL_PHYSICS_NOTES = [...PHYSICS_NOTES, ...PHYSICS_NOTES_ADDED];
const ALL_CHEMISTRY_NOTES = [...CHEMISTRY_NOTES, ...CHEMISTRY_NOTES_ADDED];
const ALL_MATHS_NOTES = [...MATHS_NOTES, ...MATHS_NOTES_ADDED];
const ALL_BIOLOGY_NOTES = [...BIOLOGY_NOTES, ...BIOLOGY_NOTES_ADDED];

const RAW_NOTES: TopicNote[] = [
  ...ALL_PHYSICS_NOTES,
  ...ALL_CHEMISTRY_NOTES,
  ...ALL_MATHS_NOTES,
  ...ALL_BIOLOGY_NOTES,
];

// All topic notes enriched with at least 100 high-yield exam points each
export const TOPIC_NOTES_DATA: TopicNote[] = enrichAllTopicNotes(RAW_NOTES);

export {
  ALL_PHYSICS_NOTES as PHYSICS_NOTES,
  ALL_CHEMISTRY_NOTES as CHEMISTRY_NOTES,
  ALL_MATHS_NOTES as MATHS_NOTES,
  ALL_BIOLOGY_NOTES as BIOLOGY_NOTES,
};
