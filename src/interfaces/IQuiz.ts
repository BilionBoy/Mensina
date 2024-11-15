import { ITag } from "./ITag";

export interface IQuiz {
  id: number,
  title: string,
  tagId: number,
  tag: ITag
}
