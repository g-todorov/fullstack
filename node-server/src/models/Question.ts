import mongoose from 'mongoose';

export type QuestionModel = mongoose.Document & {
  name: string,
  type: string,
  createdBy: string,
};

const questionSchema = new mongoose.Schema({
  name: String,
  type: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
