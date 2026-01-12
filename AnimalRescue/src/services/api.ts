// ============================================
// API SERVICE LAYER
// Currently uses local storage, ready for backend integration
// ============================================

import type { User, GameSession, ApiResponse } from '@/types';

// API configuration - easy to swap for real backend
const API_CONFIG = {
  baseUrl: '', // Will be set when backend is added
  useLocalStorage: true, // Toggle for backend vs local storage
};

// Local storage keys
const STORAGE_KEYS = {
  user: 'animal_rescue_user',
  sessions: 'animal_rescue_sessions',
  highScores: 'animal_rescue_high_scores',
};

// ============================================
// USER API
// ============================================

export const userApi = {
  async createUser(age: number): Promise<ApiResponse<User>> {
    try {
      const user: User = {
        id: `user_${Date.now()}`,
        age,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (API_CONFIG.useLocalStorage) {
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
      } else {
        // TODO: POST to backend /api/users
        // const response = await fetch(`${API_CONFIG.baseUrl}/api/users`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ age }),
        // });
        // return response.json();
      }

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  async getUser(): Promise<ApiResponse<User | null>> {
    try {
      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.user);
        if (stored) {
          return { success: true, data: JSON.parse(stored) };
        }
        return { success: true, data: null };
      } else {
        // TODO: GET from backend /api/users/me
      }
      return { success: true, data: null };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  async updateUser(updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const currentUser = await this.getUser();
      if (!currentUser.data) {
        return { success: false, error: 'User not found' };
      }

      const updatedUser: User = {
        ...currentUser.data,
        ...updates,
        updatedAt: new Date(),
      };

      if (API_CONFIG.useLocalStorage) {
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
      } else {
        // TODO: PATCH to backend /api/users/:id
      }

      return { success: true, data: updatedUser };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// ============================================
// GAME SESSION API
// ============================================

export const sessionApi = {
  async createSession(session: Omit<GameSession, 'id'>): Promise<ApiResponse<GameSession>> {
    try {
      const newSession: GameSession = {
        ...session,
        id: `session_${Date.now()}`,
      };

      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.sessions);
        const sessions: GameSession[] = stored ? JSON.parse(stored) : [];
        sessions.push(newSession);
        localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
      } else {
        // TODO: POST to backend /api/sessions
      }

      return { success: true, data: newSession };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  async getSessions(): Promise<ApiResponse<GameSession[]>> {
    try {
      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.sessions);
        const sessions: GameSession[] = stored ? JSON.parse(stored) : [];
        return { success: true, data: sessions };
      } else {
        // TODO: GET from backend /api/sessions
      }
      return { success: true, data: [] };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  async updateSession(id: string, updates: Partial<GameSession>): Promise<ApiResponse<GameSession>> {
    try {
      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.sessions);
        const sessions: GameSession[] = stored ? JSON.parse(stored) : [];
        const index = sessions.findIndex(s => s.id === id);
        
        if (index === -1) {
          return { success: false, error: 'Session not found' };
        }

        sessions[index] = { ...sessions[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions));
        
        return { success: true, data: sessions[index] };
      } else {
        // TODO: PATCH to backend /api/sessions/:id
      }
      return { success: false, error: 'Update failed' };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};

// ============================================
// HIGH SCORES API
// ============================================

interface HighScore {
  id: string;
  userId: string;
  plotId: string;
  score: number;
  savedCount: number;
  date: Date;
}

export const highScoreApi = {
  async addHighScore(score: Omit<HighScore, 'id'>): Promise<ApiResponse<HighScore>> {
    try {
      const newScore: HighScore = {
        ...score,
        id: `score_${Date.now()}`,
      };

      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.highScores);
        const scores: HighScore[] = stored ? JSON.parse(stored) : [];
        scores.push(newScore);
        scores.sort((a, b) => b.score - a.score);
        // Keep top 10
        const topScores = scores.slice(0, 10);
        localStorage.setItem(STORAGE_KEYS.highScores, JSON.stringify(topScores));
        return { success: true, data: newScore };
      } else {
        // TODO: POST to backend /api/high-scores
      }
      return { success: false, error: 'Failed to add score' };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },

  async getHighScores(): Promise<ApiResponse<HighScore[]>> {
    try {
      if (API_CONFIG.useLocalStorage) {
        const stored = localStorage.getItem(STORAGE_KEYS.highScores);
        const scores: HighScore[] = stored ? JSON.parse(stored) : [];
        return { success: true, data: scores };
      } else {
        // TODO: GET from backend /api/high-scores
      }
      return { success: true, data: [] };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  },
};
