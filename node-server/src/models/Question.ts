import mongoose from 'mongoose';
import { IQuestion } from '../interfaces';

// export type IQuestion = {
//   name: string,
//   type: string,
//   label: string,
//   options: Array<any>;
//   answer: string[],
//   createdBy: string,
//   game: string,
// };

export type QuestionModel = mongoose.Document & IQuestion;

const questionSchema = new mongoose.Schema({
  name: String,
  type: String,
  label: String,
  options: [{
    label: String,
    value: String,
  }],
  answer: [String],
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
 },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
