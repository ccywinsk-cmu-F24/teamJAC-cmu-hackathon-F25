import { NextRequest, NextResponse } from "next/server";
import { getUserService } from "@/backend/lib/dependency-injection";
import { RegisterUserSchema } from "@/backend/schemas/user.schema";
import { validateSchema, createValidationErrorResponse } from "@/backend/lib/validation";

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
      return createErrorResponse("Email already exists", 409);
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
