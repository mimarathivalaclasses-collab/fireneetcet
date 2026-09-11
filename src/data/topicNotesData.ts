import { TopicNote } from "../types";
import { PHYSICS_NOTES } from "./notes/physicsNotes";
import { PHYSICS_NOTES_ADDED } from "./notes/physicsNotesAdded";
import { PHYSICS_JEE_CET_EXTRA_NOTES } from "./notes/physicsJeeCetExtraNotes";
import { CHEMISTRY_NOTES } from "./notes/chemistryNotes";
import { CHEMISTRY_NOTES_ADDED } from "./notes/chemistryNotesAdded";
import { CHEMISTRY_JEE_CET_EXTRA_NOTES } from "./notes/chemistryJeeCetExtraNotes";
import { MATHS_NOTES } from "./notes/mathsNotes";
import { MATHS_NOTES_ADDED } from "./notes/mathsNotesAdded";
import { MATHS_JEE_CET_EXTRA_NOTES } from "./notes/mathsJeeCetExtraNotes";
import { BIOLOGY_NOTES } from "./notes/biologyNotes";
import { BIOLOGY_NOTES_ADDED } from "./notes/biologyNotesAdded";
import { NEET_BIOLOGY_EXTRA_NOTES } from "./notes/neetBiologyExtraNotes";
import { enrichAllTopicNotes } from "./notes/points100Manager";

const ALL_PHYSICS_NOTES = [
  ...PHYSICS_NOTES,
  ...PHYSICS_NOTES_ADDED,
  ...PHYSICS_JEE_CET_EXTRA_NOTES,
];
const ALL_CHEMISTRY_NOTES = [
  ...CHEMISTRY_NOTES,
  ...CHEMISTRY_NOTES_ADDED,
  ...CHEMISTRY_JEE_CET_EXTRA_NOTES,
];
const ALL_MATHS_NOTES = [
  ...MATHS_NOTES,
  ...MATHS_NOTES_ADDED,
  ...MATHS_JEE_CET_EXTRA_NOTES,
];
const ALL_BIOLOGY_NOTES = [
  ...BIOLOGY_NOTES,
  ...BIOLOGY_NOTES_ADDED,
  ...NEET_BIOLOGY_EXTRA_NOTES,
];

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
