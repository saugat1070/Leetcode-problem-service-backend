import { CreateProblemDto, UpdateProblemDto } from "../validator/problem.validator";
import { Request,Response } from "express";
import { IProblemService } from "../Services/problem.service";
import { JsonResponse } from "../utils/helper/response.helper";
import { EProblemDifficulty } from "../Models/problem.model";
export interface IProblemController{
    createProblem(req:Request,res:Response): Promise<void>;
    getProblemById(req:Request,res:Response): Promise<void>;
    getAllProblems(req:Request,res:Response): Promise<void>;
    updateProblem(req:Request,res:Response): Promise<void>;
    deleteProblem(req:Request,res:Response): Promise<void>;
    findByDifficulty(req:Request,res:Response): Promise<void>;
    searchParams(req:Request,res:Response): Promise<void>;
}

class ProblemController implements IProblemController{
    private problemService: IProblemService;
    constructor(problemService: IProblemService){
        this.problemService = problemService;
    }

    async createProblem(req: Request, res: Response): Promise<void> {
        await this.problemService.createProblem(req.body);
        JsonResponse(res,201,"Problem created successfully");
    }

    async getAllProblems(req: Request, res: Response): Promise<void> {
        const {problems,total} = await this.problemService.getAllProblems();
        JsonResponse(res,200,"Problems fetched successfully",true,{problems,total});
    }

    async getProblemById(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.getProblemById(req.params.id as string);
        JsonResponse(res,200,"Problem fetched successfully",true,problem);
    }

    async updateProblem(req: Request, res: Response): Promise<void> {
        const problem = await this.problemService.updateProblem(req.params.id as string,req.body);
        JsonResponse(res,200,"Problem updated successfully",true,problem);
    }

    async deleteProblem(req: Request, res: Response): Promise<void> {
        await this.problemService.deleteProblem(req.params.id as string);
        JsonResponse(res,200,"Problem deleted successfully");
    }

    async findByDifficulty(req: Request, res: Response): Promise<void> {
        const difficulty = req.query.difficulty as string;
        if (difficulty && !Object.values(EProblemDifficulty).includes(difficulty as EProblemDifficulty)) {
            JsonResponse(res,400,"Invalid difficulty level");
            return;
        }
        const problems = await this.problemService.findByDifficulty(difficulty as EProblemDifficulty);
        JsonResponse(res,200,"Problems fetched successfully",true,problems);
    }

    async searchParams(req: Request, res: Response): Promise<void> {
        const query = req.query.query as string;
        const problems = await this.problemService.searchParams(query);
        JsonResponse(res,200,"Problems fetched successfully",true,problems);
    }
}

export default ProblemController;