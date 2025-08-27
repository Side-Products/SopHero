import mongoose from 'mongoose';

export interface ISOP extends mongoose.Document {
  userId: string; // Changed from ObjectId to string to handle Google OAuth IDs
  fullName: string;
  email: string;
  targetUniversity: string;
  targetProgram: string;
  currentEducation: string;
  gpa: string;
  workExperience: string;
  researchExperience: string;
  extracurricularActivities: string;
  achievements: string;
  skills: string;
  careerGoals: string;
  whyThisProgram: string;
  whyThisUniversity: string;
  futurePlans: string;
  generatedSOP?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SOPSchema = new mongoose.Schema<ISOP>(
  {
    userId: {
      type: String, // Changed from ObjectId to String
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    targetUniversity: {
      type: String,
      required: true,
    },
    targetProgram: {
      type: String,
      required: true,
    },
    currentEducation: {
      type: String,
      required: false,
    },
    gpa: {
      type: String,
      required: false,
    },
    workExperience: {
      type: String,
      required: false,
    },
    researchExperience: {
      type: String,
      required: false,
    },
    extracurricularActivities: {
      type: String,
      required: false,
    },
    achievements: {
      type: String,
      required: false,
    },
    skills: {
      type: String,
      required: false,
    },
    careerGoals: {
      type: String,
      required: true,
    },
    whyThisProgram: {
      type: String,
      required: true,
    },
    whyThisUniversity: {
      type: String,
      required: true,
    },
    futurePlans: {
      type: String,
      required: false,
    },
    generatedSOP: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SOP || mongoose.model<ISOP>('SOP', SOPSchema); 