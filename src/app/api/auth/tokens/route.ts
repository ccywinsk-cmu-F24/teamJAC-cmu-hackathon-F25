import { NextRequest, NextResponse } from "next/server";
import { getAuthService } from "@/backend/lib/dependency-injection";
import { LoginRequestSchema } from "@/backend/schemas/auth.schema";
import { validateSchema, createValidationErrorResponse } from "@/backend/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await parseRequestBody(request);
    if (!body) {
      return createValidationErrorResponse("Invalid request body");
    }

    const validation = validateSchema(LoginRequestSchema, body);
    if (!validation.success) {
      return createValidationErrorResponse(validation.error!);
    }

    const authService = getAuthService();
    const result = await authService.login(validation.data!);

    if (!result) {
      return createErrorResponse("Invalid email or password", 401);
    }

    return NextResponse.json({
      token: result.token,
      userId: result.userId,
      email: result.email,
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = extractTokenFromRequest(request);
    if (!token) {
      return createErrorResponse("Authorization token is required", 401);
    }

    const authService = getAuthService();
    const success = await authService.logout({ token });

    if (!success) {
      return createErrorResponse("Failed to logout", 500);
    }

    return NextResponse.json({
      message: "Logged out successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Logout error:", error);
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

function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
}

function createErrorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
