import { CreateProblemDto, UpdateProblemDto } from "../validator/problem.validator";
import { EProblemDifficulty, IProblem } from "../Models/problem.model";
import { BadRequestError, NotFoundError } from "../utils/error/app.error";
import { IProblemRepository } from "../repositories/problem.repositories";
import { sanitize } from "../utils/helper/markdown.sanitizer";

export interface IProblemService{
    createProblem(problem: CreateProblemDto): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem>;
    getAllProblems(): Promise<{problems: IProblem[],total:number}>
    updateProblem(id:string,problem:UpdateProblemDto): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: EProblemDifficulty): Promise<IProblem[]>;
    searchParams(query:string):Promise<IProblem[]>;
}

export class ProblemService implements IProblemService{
    private problemRepository: IProblemRepository;
    constructor(problemRepository:IProblemRepository){ // constructor based dependency injection
        this.problemRepository = problemRepository;
    }
    async createProblem(problem: CreateProblemDto): Promise<IProblem>{
        if(problem.description) problem.description = await sanitize(problem.description);
        if(problem.editorial) problem.editorial = await sanitize(problem.editorial);
        return await this.problemRepository.createProblem(problem);
    }

    async getProblemById(id: string): Promise<IProblem>{
        const problem = await this.problemRepository.getProblemById(id);
        if(!problem) throw new NotFoundError("Problem not found");
        return problem;
    }

    async getAllProblems():Promise<{problems:IProblem[],total:number}>{
        return await this.problemRepository.getAllProblems();
    }

    async updateProblem(id:string,updateData:UpdateProblemDto):Promise<IProblem|null>{
        const problem = await this.problemRepository.getProblemById(id);
        if(!problem) throw new NotFoundError("Problem is not found");
        if(updateData.description) updateData.description = await sanitize(updateData.description);
        if(updateData.editorial) updateData.editorial = await sanitize(updateData.editorial);
        return this.problemRepository.updateProblem(id,updateData);
    }

    async deleteProblem(id:string): Promise<boolean>{
        const result = await this.problemRepository.deleteProblem(id);
        if(!result) throw new NotFoundError("Problem not found");
        return result;
    }

    async findByDifficulty(difficulty: EProblemDifficulty) : Promise<IProblem[]>{
        return await this.problemRepository.findByDifficulty(difficulty);
    }

    async searchParams(query: string): Promise<IProblem[]>{
        if(!query || query.trim() === "") throw new BadRequestError("Query is required");
        return await this.problemRepository.searchParams(query);
    }
}