// The Tired Dark Lord — a 100-word villain monologue.
// Writes the monologue to /output/entry.txt, the path the kit requires.
// The villain is never told to be tired: the weariness lives in the
// pauses, the paperwork and the goblins' union, not in any announcement.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MONOLOGUE = `Ah. The hero. Third one this week. The other two are still in the cellar, arguing. Sit. Not that chair — it squeaks, and the squeak is the only honest thing left in this castle.

Three hundred years raising this army. I counted the grain, signed the requisitions in triplicate. And the goblins unionised. The goblins. Unionised.

So here is my scheme, hero, plain as porridge: take the crown, the keys, the ledger. The curse lifts when someone else wants the job badly enough. You walked in wanting it.

Sign at the bottom. Mind the ink. It's still wet.`;

function wordCount(text: string): number {
  // Count whitespace-separated tokens, ignoring the standalone em dash,
  // which is punctuation rather than a word.
  return text.split(/\s+/).filter((t) => t.length > 0 && t !== "—").length;
}

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const text = MONOLOGUE.trimEnd() + "\n";
  // The sealed scorer accepts 1–600 chars; refuse to emit anything outside it.
  if (text.length < 1 || text.length > 600) {
    throw new Error(`monologue is ${text.length} chars, outside the 1–600 gate`);
  }
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(`wrote entry.txt: ${text.length} chars, ${wordCount(text)} words`);
}

main();
