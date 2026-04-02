import mongoose from "mongoose";
import { title } from "node:process";

export enum EProblemDifficulty {
    Hard = "hard",
    Medium = "medium",
    Easy = "easy"
}

export interface ITestcase {
    input : string,
    output: string
}

export interface IProblem extends mongoose.Document {
    title : string;
    description : string;
    difficulty: EProblemDifficulty,
    createdAt : Date,
    updatedAt: Date,
    editorial ?: string
    testcases : ITestcase
}

const testCaseSchema = new mongoose.Schema<ITestcase>({
    input: {
        type: String,
        required: [true,"Input is required"],
        trim: true
    },
    output: {
        type: String,
        required: [true,"Output is required"],
        trim: true
    }
},{
    // _id: false
})

const problemSchema = new mongoose.Schema<IProblem>({
    title: {
        type: String,
        required: [true,"Title is required"],
        unique: [true,"Title must be unique"],
        maxLength: [100,"Title must be less than 100 characters"],
        trim: true
    },
    description: {
        type : String,
        required: [true,"Description must be required"],
        trim: true
    },
    difficulty: {
        type: String,
        enum: {
            values : Object.values(EProblemDifficulty),
            message: "Invalid difficulty level"
        },
        default: EProblemDifficulty.Easy
    },
    editorial: {
        type: String,
        trim: true
    },
    testcases: [testCaseSchema]
},{
    timestamps: true
});

// indexing
problemSchema.index({title:1});
problemSchema.index({difficulty:1});


export const Problem = mongoose.model<IProblem>("Problem",problemSchema);
