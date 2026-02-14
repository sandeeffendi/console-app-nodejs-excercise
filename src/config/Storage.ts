import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { StudentProps } from "../models/Student.js";

const FILE_PATH = "./data.json";

const isStudentProps = (value: unknown): value is StudentProps => {
  if (typeof value !== "object" || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.score === "number"
  );
};

class Storage {
  static readonly instanceof: Storage = new Storage();

  load(): StudentProps[] {
    if (!existsSync(FILE_PATH)) return [];

    const rawData = readFileSync(FILE_PATH, "utf-8");

    try {
      const parsedData: unknown = JSON.parse(rawData);

      if (!Array.isArray(parsedData)) return [];

      return parsedData.filter(isStudentProps);
    } catch {
      return [];
    }
  }

  save(data: ReadonlyArray<StudentProps>): void {
    writeFileSync(FILE_PATH, JSON.stringify(data, null));
  }
}

export { Storage };
