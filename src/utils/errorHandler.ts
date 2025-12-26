import type { ErrorRequestHandler } from "express";

type ApiLikeError = Error & {
  isApiError?: boolean;
  status?: number;
};

type ValidationLikeError = Error & {
  name?: string;
  array?: () => unknown[];
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const e = err as ApiLikeError;
  console.error("Error:", e?.message || err);

  if (e.isApiError && e.status) {
    return res.status(e.status).json({
      error: { message: e.message },
    });
  }

  const vErr = err as ValidationLikeError;
  if (vErr.name === "ValidationError" || typeof vErr.array === "function") {
    return res.status(400).json({
      error: {
        message: vErr.message || "Incorrect data",
        details: typeof vErr.array === "function" ? vErr.array() : undefined,
      },
    });
  }

  const message = (err as any)?.message || "Unknown server error";
  return res.status(500).json({
    error: { message },
  });
};

export default errorHandler;