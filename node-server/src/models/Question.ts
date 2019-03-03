import mongoose from 'mongoose';

export type IQuestion = {
  name: string,
  type: string,
  options: Array<any>;
  answer: string[],
  createdBy: string,
  game: string,
};

export type QuestionModel = mongoose.Document & {
  name: string,
  type: string,
  options: Array<any>;
  answer: string[],
  createdBy: string,
  game: string,
};

const questionSchema = new mongoose.Schema({
  name: String,
  type: String,
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
