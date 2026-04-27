import { Router } from "express";
import ProblemController from "../../Controllers/problem.controller";
import { ProblemService } from "../../Services/problem.service";
import { validateRequestBody } from "../../validator";
import { createProblemSchema } from "../../validator/problem.validator";
import { ProblemRepository } from "../../repositories/problem.repositories";

const problemRouter: Router = Router();

// wiring up the modules
const isntanceProblemRepository = new ProblemRepository();
const instanceProblemService = new ProblemService(isntanceProblemRepository);
const instanceProblemController = new ProblemController(instanceProblemService);




problemRouter.route("/")
    .post(validateRequestBody(createProblemSchema), instanceProblemController.createProblem.bind(instanceProblemController)) // route to create new problem
    .get(instanceProblemController.getAllProblems.bind(instanceProblemController)) // route to get all problems

problemRouter.route("/:id")
    .get(instanceProblemController.getProblemById.bind(instanceProblemController)) // route to get problem by id
    .put(validateRequestBody(createProblemSchema), instanceProblemController.updateProblem.bind(instanceProblemController)) // route to update problem
    .delete(instanceProblemController.deleteProblem.bind(instanceProblemController)) // route to delete problem

problemRouter.route("/difficulty")
    .get(instanceProblemController.findByDifficulty.bind(instanceProblemController)) // route to find problems by difficulty

problemRouter.route("/search")
    .get(instanceProblemController.searchParams.bind(instanceProblemController)) // route to search problems by query

export default problemRouter;