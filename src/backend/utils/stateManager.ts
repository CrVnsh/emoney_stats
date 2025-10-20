// utils/stateManager.ts (for reuse anywhere in your app)
import fs from "fs";
import path from "path";

const filePath = path.resolve("state.json");

export function loadAppState(): any {
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  }
  return {}; // default state
}

export function saveAppState(data: any): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
