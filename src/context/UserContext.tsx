// src/context/UserContext.tsx — global XP/level/progress state via useReducer.
import { createContext, useContext, useReducer, type ReactNode } from "react";
import { toast } from "sonner";
import { levelTitles, userStats } from "@/data/mockData";

interface UserState {
  xp: number;
  level: number;
  levelTitle: string;
  xpToNextLevel: number;
  completedMilestones: string[];
  unlockedBadges: string[];
  completedChallenges: string[];
}

type Action =
  | { type: "GAIN_XP"; amount: number }
  | { type: "COMPLETE_MILESTONE"; id: string; xp: number }
  | { type: "TOGGLE_CHALLENGE"; id: string; xp: number }
  | { type: "UNLOCK_BADGE"; id: string };

const XP_PER_LEVEL = 6000;

function applyLevel(state: UserState): UserState {
  let { xp, level } = state;
  let leveled = false;
  while (xp >= XP_PER_LEVEL) {
    xp -= XP_PER_LEVEL;
    level += 1;
    leveled = true;
  }
  if (leveled) {
    const title = levelTitles[level] ?? "Cloud Master";
    // Defer toast to avoid firing during render.
    queueMicrotask(() => toast.success(`Level up! You're now Level ${level} · ${title}`));
    return { ...state, xp, level, levelTitle: title };
  }
  return { ...state, xp };
}

function reducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "GAIN_XP":
      return applyLevel({ ...state, xp: state.xp + action.amount });
    case "COMPLETE_MILESTONE": {
      if (state.completedMilestones.includes(action.id)) return state;
      return applyLevel({
        ...state,
        xp: state.xp + action.xp,
        completedMilestones: [...state.completedMilestones, action.id],
      });
    }
    case "TOGGLE_CHALLENGE": {
      const done = state.completedChallenges.includes(action.id);
      if (done) {
        return applyLevel({
          ...state,
          xp: Math.max(0, state.xp - action.xp),
          completedChallenges: state.completedChallenges.filter((c) => c !== action.id),
        });
      }
      return applyLevel({
        ...state,
        xp: state.xp + action.xp,
        completedChallenges: [...state.completedChallenges, action.id],
      });
    }
    case "UNLOCK_BADGE":
      if (state.unlockedBadges.includes(action.id)) return state;
      return { ...state, unlockedBadges: [...state.unlockedBadges, action.id] };
    default:
      return state;
  }
}

const initialState: UserState = {
  xp: userStats.xp,
  level: userStats.level,
  levelTitle: userStats.levelTitle,
  xpToNextLevel: XP_PER_LEVEL,
  completedMilestones: [],
  unlockedBadges: [],
  completedChallenges: [],
};

interface UserContextValue extends UserState {
  dispatch: React.Dispatch<Action>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={{ ...state, dispatch }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
