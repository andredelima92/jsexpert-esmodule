import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-br";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    console.log("person", person.formatted(DEFAULT_LANG));
    terminalController.updateTable(person.formatted(DEFAULT_LANG));

    return mainLoop();
  } catch (err) {
    console.error("Deu RUIM**", err);
    return mainLoop();
  }
}

await mainLoop();
