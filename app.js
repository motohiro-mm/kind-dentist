#!/usr/bin/env node

import { Display } from "./display.js";
import { Dentist } from "./dentist.js";
import minimist from "minimist";
import { fileURLToPath } from "url";
import path from "path";

class App {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  async run() {
    const argv = minimist(process.argv.slice(2));
    const numberOptions = Object.keys(argv).length;
    try {
      if (argv.setup) {
        this.setup();
      } else if (numberOptions === 1 && !argv._.length) {
        await this.main();
      } else {
        throw new Error("使えるオプションは [--setup] のみです");
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  setup() {
    console.log(
      "\n--------------------------------------------------------------------------------",
    );
    console.log(
      "\n表示された線が1行で見えるように画面の幅を調整していただきますと、\nアプリ中の文字が見やすく表示されます。",
    );
  }

  async main() {
    this.#exitIfReceiveCancel();

    const instructionDisplay = new Display(goodWaitingTime);
    await instructionDisplay.frame(Display.instruction);
    const dentist = new Dentist(this.dirPath);
    const mainTrouble = await dentist.examine();
    const patientPattern = await dentist.explain(mainTrouble);
    const lastReply = await dentist.talkAfterExplain(patientPattern);
    await dentist.tellJoke(lastReply, goodWaitingTime);
    await dentist.sayClosing(goodWaitingTime);
    const cautionDisplay = new Display(goodWaitingTime * 2.2);
    await cautionDisplay.frame(Display.cautionNote);
    console.log(Display.goDentalClinic);
  }

  #exitIfReceiveCancel() {
    process.on("SIGINT", () => {
      Display.cancelProcess();
    });
  }
}

const goodWaitingTime = 1000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new App(__dirname);
app.run();
