#!/usr/bin/env node
/**
 * Quick MongoDB connectivity check.
 *
 *   npm run db:check
 *
 * Reads MONGODB_URI from `.env.local` (same file `next dev` uses) and prints a
 * readable diagnosis instead of a raw driver stack trace — handy when course
 * pages suddenly start showing "temporarily unavailable".
 */
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error(
    '✖ MONGODB_URI is not set.\n' +
      '  Add it to .env.local (see .env.example) and run this again.'
  );
  process.exit(1);
}

const host = uri.replace(/^mongodb(\+srv)?:\/\//, '').split('@').pop().split('/')[0];
const isSrv = uri.startsWith('mongodb+srv://');

console.log(`→ Connecting to ${host} (${isSrv ? 'SRV' : 'direct'})…`);

const startedAt = Date.now();

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

  const db = mongoose.connection.db;
  const lessons = await db.collection('lessons').countDocuments();

  console.log(`✔ Connected in ${Date.now() - startedAt} ms to database "${db.databaseName}"`);
  console.log(`✔ Collection "lessons" contains ${lessons} document(s)`);

  if (lessons === 0) {
    console.log(
      'ℹ The cluster is reachable but empty — create a lesson (POST /api/lessons)\n' +
        '  so /courses and /admin/dashboard have something to show.'
    );
  }
} catch (error) {
  const code = error?.code ?? 'unknown';
  console.error(`✖ Connection failed (${code}): ${error?.message ?? error}\n`);

  if (code === 'ENOTFOUND') {
    console.error(
      '  The hostname does not resolve, which usually means the Atlas cluster no\n' +
        '  longer exists (deleted, renamed or the project was removed).\n' +
        '  1. Sign in at https://cloud.mongodb.com and check the cluster name.\n' +
        '  2. Copy a fresh connection string (Connect → Drivers → Node.js).\n' +
        '  3. Update MONGODB_URI in .env.local and restart `npm run dev`.'
    );
  } else if (code === 'EREFUSED' || code === 'ECONNREFUSED') {
    console.error(
      '  Nothing is listening on that port. Check the host/port of MONGODB_URI.'
    );
  } else if (/Authentication failed|bad auth/i.test(error?.message ?? '')) {
    console.error(
      '  The cluster answered but rejected the credentials.\n' +
        '  1. Re-create the database user in Atlas (Database Access).\n' +
        '  2. Rotate the password if it was ever exposed and update .env.local.'
    );
  } else {
    console.error(
      '  If the credential was ever committed or bundled, rotate it in Atlas\n' +
        '  (Database Access → Edit → Edit Password) and update .env.local.\n' +
        '  Also confirm Network Access allows your current IP address.'
    );
  }

  process.exitCode = 1;
} finally {
  await mongoose.disconnect().catch(() => {});
}
