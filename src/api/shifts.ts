import { httpJson } from "./http";
import type { Shift } from "@/stores/types";

export async function fetchShifts(): Promise<Shift[]> {
  return httpJson<Shift[]>("/api/shifts/");
}