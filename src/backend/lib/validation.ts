import { z } from "zod";
import { NextResponse } from "next/server";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return {
        success: false,
        error: firstError.message,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      error: "Validation error occurred",
    };
  }
}

export function createValidationErrorResponse(message: string): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: 400 }
  );
}
