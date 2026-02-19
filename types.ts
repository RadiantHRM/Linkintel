
export interface ProfileAnalysis {
  name: string;
  industry: string;
  seniorityLevel: string;
  yearsExperience: number;
  careerTrajectory: string;
  leadershipScope: string;
  likelyCompensationTier: string;
  transitionLikelihood: number;
  keyStrengths: string[];
  recentRoleSummary: string;
  country: string;
  sources: { title: string; uri: string }[];
}

export interface AppState {
  loading: boolean;
  error: string | null;
  result: ProfileAnalysis | null;
}
