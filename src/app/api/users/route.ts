import { NextRequest, NextResponse } from "next/server";
import { getUserService } from "@/backend/lib/dependency-injection";
import { RegisterUserSchema } from "@/backend/schemas/user.schema";
import { validateSchema, createValidationErrorResponse } from "@/backend/lib/validation";

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email already exists
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
export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);
    if (!body) {
      return createValidationErrorResponse("Invalid request body");
    }

    const validation = validateSchema(RegisterUserSchema, body);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error!);
    }

    const userService = getUserService();
    const user = await userService.register(validation.data!);

    if (!user) {
      return createErrorResponse("Sorry, email or password does not match our record", 400);
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
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
