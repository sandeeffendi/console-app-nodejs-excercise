import { Storage } from "../config/Storage.js";
import { Student } from "../models/Student.js";

class StudentService {
  private student: ReadonlyArray<Student>;
  private readonly storage: Storage;

  constructor() {
    this.storage = new Storage();

    const rawStudents = this.storage.load();

    this.student = rawStudents.map((student) => {
      return new Student({
        id: student.id,
        name: student.name,
        score: student.score,
      });
    });
  }

  getAll(): ReadonlyArray<Student> {
    return [...this.student];
  }

  Add(name: string, score: number): void {
    if (!Number.isFinite(score)) {
      throw new TypeError("Score must be a valid number.");
    }
    if (score < 0 || score > 100) {
      throw new RangeError("Score must be a value between 0 to 100.");
    }

    const newStudent = new Student({
      id: Date.now().toString(),
      name: name,
      score: score,
    });

    const updatedStudents = [...this.student, newStudent];
    this.student = updatedStudents;

    this.storage.save(
      updatedStudents.map((student) => {
        return new Student({
          id: student.id,
          name: student.name,
          score: student.score,
        });
      }),
    );
  }
}

export { StudentService };
