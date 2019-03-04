export type IQuestion = {
  name: string,
  type: string,
  options: Array<any>;
  answer: string[],
  createdBy: string,
  game: string,
};