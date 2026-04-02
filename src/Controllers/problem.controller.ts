import { CreateProblemDto, UpdateProblemDto } from "../validator/problem.validator";
import { Request,Response } from "express";
export interface IProblemController{
    createProblem(req:Request,res:Response): Promise<void>;
    getProblemById(req:Request,res:Response): Promise<void>;
    getAllProblems(req:Request,res:Response): Promise<void>;
    updateProblem(req:Request,res:Response): Promise<void>;
    deleteProblem(req:Request,res:Response): Promise<void>;
    findByDifficulty(req:Request,res:Response): Promise<void>;
    searchParams(req:Request,res:Response): Promise<void>;
}

export class ProblemController implements IProblemController{
    private problemService: IProblemController;
    constructor(problemService: IProblemController){
        this.problemService = problemService;
    }
}