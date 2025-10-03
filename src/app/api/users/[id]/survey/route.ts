import { NextRequest, NextResponse } from "next/server";
import { getSurveyService } from "@/backend/lib/dependency-injection";
import { UpdateSurveySchema } from "@/backend/schemas/survey.schema";
import { validateSchema, createValidationErrorResponse } from "@/backend/lib/validation";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * @swagger
 * /api/users/{id}/survey:
 *   put:
 *     summary: Update user survey answers
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answers
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - answer
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       oneOf:
 *                         - type: string
 *                         - type: array
 *                           items:
 *                             type: string
 *     responses:
 *       200:
 *         description: Survey updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 answers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionId:
 *                         type: string
 *                       answer:
 *                         oneOf:
 *                           - type: string
 *                           - type: array
 *                             items:
 *                               type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id: userId } = await context.params;

    if (!userId) {
      return createValidationErrorResponse("User ID is required");
    }

    const body = await parseRequestBody(request);
    if (!body) {
      return createValidationErrorResponse("Invalid request body");
    }

    const validation = validateSchema(UpdateSurveySchema, body);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error!);
    }

    const surveyService = getSurveyService();
    const result = await surveyService.updateSurvey(userId, validation.data!);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Survey update error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

/**
 * @swagger
 * /api/users/{id}/survey:
 *   get:
 *     summary: Get user survey answers
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: Survey answers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 answers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionId:
 *                         type: string
 *                       answer:
 *                         oneOf:
 *                           - type: string
 *                           - type: array
 *                             items:
 *                               type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: No survey answers found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id: userId } = await context.params;

    if (!userId) {
      return createValidationErrorResponse("User ID is required");
    }

    const surveyService = getSurveyService();
    const result = await surveyService.getSurveyAnswers(userId);

    if (!result) {
      return createErrorResponse("No survey answers found", 404);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Survey fetch error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

// Helper functions
async function parseRequestBody(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function createErrorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
