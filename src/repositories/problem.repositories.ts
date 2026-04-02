import { CreateProblemDto, UpdateProblemDto } from "../validator/problem.validator";
import { EProblemDifficulty, IProblem, Problem } from "../Models/problem.model";

export interface IProblemRepository{
    createProblem(problem: CreateProblemDto): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem>;
    getAllProblems(): Promise<{problems: IProblem[],total:number}>
    updateProblem(id:string,problem:UpdateProblemDto): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: EProblemDifficulty): Promise<IProblem[]>;
    searchParams(query:string):Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository{
    async createProblem(problem: CreateProblemDto): Promise<IProblem> {
        const newProblem = new Problem(problem);
        return await newProblem.save();
    }

    async getAllProblems(): Promise<{ problems: IProblem[]; total: number; }> {
        const allProblems = await Problem.find({}).sort({createdAt:-1});
        const totalCount = await Problem.countDocuments();
        return {problems:allProblems,total:totalCount}
    }

    async getProblemById(id: string): Promise<IProblem> {
        const res = await Problem.findById(id);
        if(!res) throw new Error("problem with this email is not found");
        return res;
    }

    async updateProblem(id: string, problem: UpdateProblemDto): Promise<IProblem | null> {
        const updateResponse = await Problem.findByIdAndUpdate(id,{
            ...problem
        },
    {
        returnDocument: "after"
    });
        return updateResponse;
    }

    async deleteProblem(id: string): Promise<boolean> {
        const isDelete = await Problem.findByIdAndDelete(id);
        return isDelete ? true : false;
    }

    async findByDifficulty(difficulty: EProblemDifficulty): Promise<IProblem[]> {
        const response = await Problem.find({difficulty:difficulty}).sort({createdAt:-1});
        return response;
    }

    async searchParams(query: string): Promise<IProblem[]>{
        const regex = RegExp(query,"i");
        return await Problem.find({
            $or: [{title:regex},{description:regex}]
        }).sort({createdAt:1})
    }

}