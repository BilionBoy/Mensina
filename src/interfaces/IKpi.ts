export interface IKpi {
  correctAnswersAvarage: number
  userId: number
  totaScore: number
  quizzesRank: {
    quizTitle: string
    quizId: number
    tagDescription: string
    tagId: number
    score: number
  }[]
  tagsRank: {
    tagDescription: string
    tagId: number
    totalscore: number
  }[]
}