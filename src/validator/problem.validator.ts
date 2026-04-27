import {z} from "zod";
import { EProblemDifficulty } from "../Models/problem.model";

export const createProblemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    difficulty: z.enum(Object.values(EProblemDifficulty)),
    editorial: z.string().optional(),
    testcases: z.array(z.object({
        input: z.string().min(1),
        output: z.string().min(1)
    })).optional()
})

export const updateProblemSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    difficulty: z.enum(Object.values(EProblemDifficulty)).optional(),
    editorial: z.string().optional(),
    testcases: z.array(z.object({
        input: z.string().min(1),
        output: z.string().min(1)
    })).optional()
})

export const findByDifficultySchema = z.object({
    difficulty: z.enum(Object.values(EProblemDifficulty))
})

export const searchParamsSchema = z.object({
    query: z.string().min(1)
})

export type CreateProblemDto = z.infer<typeof createProblemSchema>;
export type UpdateProblemDto = z.infer<typeof updateProblemSchema>;