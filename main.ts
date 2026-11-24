// Last Text at One Percent — make.fun entry (program/v1, Node 22).
//
// The program writes one final text message to /output/entry.txt: the last
// text a phone sends at one percent battery, in the phone's own voice.
// Deterministic: the same fixed message on every run. No model calls, no
// network, no randomness, no clock. Outside the grader's sandbox,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The entry: the phone confesses it has been faking 1% for twenty minutes,
// just to see whether its owner would ever put it down. The owner didn't.
// A real turn, a specific detail, and a voice with a stake in dying —
// in 108 characters, as one text message.
const MESSAGE =
  "1%. i've been at 1% for 20 minutes. i just wanted to see if you'd put me down for once. you didn't. goodbye.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Check before writing, then read back and confirm
// the file is byte-identical to what was written.
const chars = [...MESSAGE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, outside the 1-200 gate`);
}
if (MESSAGE.trim().length === 0) {
  throw new Error('entry is only white space');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, 'entry.txt');
writeFileSync(outPath, MESSAGE, 'utf8');
const readBack = readFileSync(outPath, 'utf8');
if (readBack !== MESSAGE) {
  throw new Error('read-back differs from the written entry');
}
