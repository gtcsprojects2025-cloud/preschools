import { NextResponse } from 'next/server';

/**
 * Socket-level and driver-level failures that mean "the database is not
 * reachable right now" rather than "this request was invalid".
 *
 * Returning 503 (instead of 500) for these lets clients, uptime monitors and
 * CDNs treat a database outage as a temporary condition and retry later.
 */
const CONNECTION_ERROR_CODES = new Set([
  'ENOTFOUND',
  'EAI_AGAIN',
  'ESERVFAIL',
  'ECONNREFUSED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ETIMEDOUT',
  'EPIPE',
]);

export function isDatabaseUnavailable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const { code } = error as NodeJS.ErrnoException;
  if (code && CONNECTION_ERROR_CODES.has(code)) return true;
  if (error.name === 'MongooseServerSelectionError') return true;

  return /querySrv|ENOTFOUND|ECONNREFUSED|server selection timed out/i.test(
    error.message
  );
}

/**
 * Build the response for an unreachable database.
 *
 * The driver message (which can contain connection details) is deliberately
 * not echoed to the client — only a coarse error code is logged server-side.
 */
export function databaseUnavailable(error: unknown) {
  const { code } = (error ?? {}) as NodeJS.ErrnoException;

  console.error(
    `[db] database unavailable${code ? ` (${code})` : ''} — check MONGODB_URI and Atlas network access`
  );

  return NextResponse.json(
    {
      error: 'Database unavailable',
      message:
        'The course catalogue is temporarily unavailable. Please try again in a moment.',
    },
    {
      status: 503,
      headers: { 'Retry-After': '30', 'Cache-Control': 'no-store' },
    }
  );
}
