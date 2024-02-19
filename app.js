#!/usr/bin/env node

import { Display } from "./display.js";
import { Dentist } from "./dentist.js";
import minimist from "minimist";

const oneSecond = 1000;
const calmSpeed = 120;
const explanationSpeed = 850;
const jokeBeforeSpeed = 250;
const jokeSpeed = 20;

class App {
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
      "\n表示された線が1行で見えるように画面の幅を調整していただきますと、\nアプリ中の文字が正しく表示されます。",
    );
  }

  async main() {
    Display.exitIfReceiveCancel();

    await Display.frame(Display.instruction, oneSecond);
    const dentist = new Dentist();
    const mainTrouble = await dentist.examine(calmSpeed);
    const patientPattern = await dentist.explain(mainTrouble, explanationSpeed);
    const lastReply = await dentist.talkAfterExplain(patientPattern);
    await dentist.tellJoke(lastReply, jokeBeforeSpeed, jokeSpeed, oneSecond);
    await dentist.sayClosing(calmSpeed, oneSecond);
    await Display.frame(Display.cautionNote, oneSecond * 2.2);
    console.log(Display.goDentalClinic);
  }
}

const app = new App();
app.run();
