import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { StudentService } from "./service/StudentService.js";
import { StudentController } from "./controller/StudentController.js";

const rl = readline.createInterface({
  input,
  output,
});

const service = new StudentService();
const controller = new StudentController(service);

const main = async (): Promise<void> => {
  while (true) {
    controller.showMenu();

    const answer = await rl.question("Choose Option: ");
    const shouldAdd = controller.handleSelection(answer);

    if (shouldAdd) {
      const name = await rl.question("Student Name: ");
      const score = await rl.question("Student Score: ");

      controller.addStudent(name, score);
    }
  }
};

try {
  await main();
} catch (error) {
  if (error instanceof Error) {
    console.log(`Unexpected Error: ${error.message}`);
  }
  rl.close();
}
