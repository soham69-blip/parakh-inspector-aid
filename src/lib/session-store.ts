import { useSyncExternalStore } from "react";

export type Decision = "confirmed" | "false-positive" | "manual-review";

interface SessionState {
  decisions: Record<string, Decision>;
  pinnedTop: string | null;
}

let state: SessionState = { decisions: {}, pinnedTop: null };
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => state;

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function recordDecision(id: string, decision: Decision) {
  state.decisions[id] = decision;
  emit();
}

export function pinToTop(id: string) {
  state.pinnedTop = id;
  emit();
}

export const DECISION_LABEL: Record<Decision, string> = {
  confirmed: "Finding confirmed",
  "false-positive": "Marked false positive",
  "manual-review": "Sent for manual review",
};
