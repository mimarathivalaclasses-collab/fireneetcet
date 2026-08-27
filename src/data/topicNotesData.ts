import { TopicNote } from "../types";
import { PHYSICS_NOTES } from "./notes/physicsNotes";
import { CHEMISTRY_NOTES } from "./notes/chemistryNotes";
import { MATHS_NOTES } from "./notes/mathsNotes";
import { BIOLOGY_NOTES } from "./notes/biologyNotes";

export { PHYSICS_NOTES, CHEMISTRY_NOTES, MATHS_NOTES, BIOLOGY_NOTES };

export const TOPIC_NOTES_DATA: TopicNote[] = [
  ...PHYSICS_NOTES,
  ...CHEMISTRY_NOTES,
  ...MATHS_NOTES,
  ...BIOLOGY_NOTES,
];
