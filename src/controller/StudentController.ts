import { StudentService } from "../service/StudentService.js";

class StudentController {
  constructor(private readonly service: StudentService) {}

  showMenu(): void {
    console.log("\n ===== Student Grading System =====");
    console.log("1. Add Student");
    console.log("2. Show Student List");
    console.log("3. Clear Students List");
    console.log("4. Exit");
  }

  handleSelection(input: string): boolean {
    switch (input) {
      case "1":
        return true;
      case "2":
        this.listStudent();
        return false;
      case "3":
        this.clearStudent();
        return false;
      case "4":
        console.log("\nGoodBye!");
        process.exit(0);
      default:
        console.log("\nUnexpected input.");
        return false;
    }
  }

  addStudent(name: string, inputScore: string) {
    const score = Number.parseInt(inputScore);

    try {
      this.service.Add(name, score);
      console.log("\nStudent added succesfully.");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`\nCaught an error: ${error.message}`);
      }
    }
  }

  private clearStudent(): void {
    try {
      this.service.clear();
      console.log("\nStudent list cleared successfully.");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`\nCaught an error: ${error.message}`);
      }
    }
  }

  private listStudent(): void {
    const student = this.service.getAll();

    if (student.length === 0) {
      console.log("\nStudent data not found");
      return;
    }

    console.log("\n==== Students Data ====");
    student.forEach((student) => {
      console.log(`${student.name} - ${student.score} - ${student.grade}`);
    });
  }
}

export { StudentController };
