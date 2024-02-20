import { Display } from "./display.js";
import { readFile } from "fs/promises";
import enquirer from "enquirer";
const { Select } = enquirer;

export class Dentist {
  constructor(dirPath) {
    this.dirPath = dirPath,
    this.calm = this.#talkSpeed.calm
    this.explanation = this.#talkSpeed.explanation
    this.jokeBefore = this.#talkSpeed.jokeBefore
    this.joke = this.#talkSpeed.joke
  }

  async examine() {
    const selectedTroubles = [{ value: "general_oral_troubles.json" }];
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        this.#lookCalm();
        await Display.printComments(
          this.#firstComment,
          this.calm,
          Display.formatChars,
        );
      }
      const choices = await JSON.parse(
        await readFile(`${this.dirPath}/lib/${selectedTroubles[i].value}`),
      );
      const selectedTrouble = await this.#askQuestion(
        this.#questionTexts[i],
        choices,
      );
      selectedTroubles.push(selectedTrouble);
      this.#lookCalm();
      const dentistReply = selectedTroubles[i + 1].dentistReply;
      await Display.printComments(dentistReply, this.calm, Display.formatChars);
      if (selectedTrouble.title) {
        break;
      }
    }
    return selectedTroubles.pop();
  }

  async explain(mainTrouble) {
    const explanation = await JSON.parse(
      await readFile(`${this.dirPath}/lib/${mainTrouble.value}`),
    ).find((element) => element.title === mainTrouble.title);
    await Display.printComments(explanation.detail, this.explanation, Display.formatLines);
    return explanation.pattern;
  }

  async talkAfterExplain(pattern) {
    const lastChoices = await JSON.parse(
      await readFile(`${this.dirPath}/lib/dentist_jokes.json`),
    ).find((element) => element.pattern === pattern).jokes;
    return await this.#askQuestion(this.#questionTexts[3], lastChoices);
  }

  async tellJoke(lastReply, times) {
    this.#makeAngryButKidding();
    await Display.printComments(
      "むむむっ！",
      this.jokeBefore,
      Display.formatChars,
    );
    await Display.printComments(lastReply.joke, this.joke, Display.formatChars);
    await Display.waitingTime(times);
  }

  async sayClosing(times) {
    this.#lookCalm();
    await Display.printComments(this.#lastComment, this.calm, Display.formatChars);
    await Display.waitingTime(times);
  }

  async #askQuestion(messages, patientWords) {
    const question = await new Select({
      name: "name",
      type: "select",
      message: messages,
      choices: patientWords,
      result() {
        return this.choices[this.focused.id - 1];
      },
      onCancel() {
        Display.cancelProcess();
      },
    });
    return question.run();
  }

  #lookCalm() {
    process.stdout.write(`
  (  ¯灬¯ ) < `);
  }

  #makeAngryButKidding() {
    process.stdout.write(`
  (  •̀灬•́ )」 < `);
  }

  #questionTexts = [
    "あなたのお悩みを教えてください。",
    "お悩みを詳しく教えてください",
    "あてはまるものを選んでください",
    "今のあなたの気持ちを選んでください",
  ];

  #firstComment = "ワシはやさしい歯医者さんじゃ。今日はどうしたのかのぅ。\n\n";

  #lastComment =
    "ふぅ。\n\nまぁ、ワシの言うことなど聞きながすんじゃ。\nおぬしの好きにするがよいぞ。\nお大事にのぅ。\n\n";

  #talkSpeed = {
    calm: 110,
    explanation: 850,
    jokeBefore: 250,
    joke: 20
    }
  }
