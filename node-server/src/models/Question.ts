import mongoose from 'mongoose';

export type QuestionModel = mongoose.Document & {
  name: string,
  type: string,
  userCreatedBy: string,
};

const questionSchema = new mongoose.Schema({
  name: String,
  type: String,
  userCreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
