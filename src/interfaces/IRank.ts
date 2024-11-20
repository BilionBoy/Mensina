export interface IRank {
    id: number;
    totalScore: number;
    user: {
      id: number;
      name: string;
      username: string;
      iconPath: string;
    };
    bestScoreQuiz: {
      id: number;
      title: string;
      tag: {
        id: number;
        description: string;
      };
    };
  }
  