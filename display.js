export class Display {
  constructor(speed, formatType = Display.#formatChars) {
    this.speed = speed;
    this.formatType = formatType;
  }

  async printComments(comments) {
    const printComments = comments.split(this.formatType.partition);
    printComments.forEach((comment, index) => {
      setTimeout(() => {
        this.formatType.print(comment);
      }, index * this.speed);
    });
    await this.waitingTime(printComments.length * this.speed);
  }

  static #formatChars = {
    partition: "",
    print: (char) => {
      process.stdout.write(char);
    },
  };

  static formatLines = {
    partition: "\n",
    print: (line) => {
      console.log(line);
    },
  };

  waitingTime(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  static cancelProcess() {
    const cancelDisplay = new Display();
    console.log("\n今回はここまでにしましょう。");
    cancelDisplay.frame(Display.cautionNote);
    process.exit(1);
  }

  async frame(content) {
    console.log(`
--------------------------------------------------------------------------------
${content}
--------------------------------------------------------------------------------
`);
    await this.waitingTime(this.speed);
  }

  static instruction = `
                         ここは やさしい歯医者さん です
                        先生に お悩みを 話してみましょう
`;

  static cautionNote = `
                             おつかれさまでした
                       先生の おはなしは 説明も 小言も
                            すべて 冗談ですので
                      気になさらないように してくださいね
                          お大事に なさってください
`;

  static goDentalClinic = `
        #                             #     #                                   
   #    #        ##############       #     #                     ## #    ###   
   #    ######   #   #            ##########                     #  ##   #   #  
   #    #        #   #                #    #         ##         #    #  #     # 
   #    #        #  #########         #   #         #  #        #       #     # 
################ # ##   #             #  #         ##  ##      #        #     # 
  #          #   #      #       ################   #    #      #        #     # 
  # #  #  #  #   # ###########         #          ##    ##     #   #### #     # 
  #  # # #   #   #     # #            #          ##      ##    #     #  #     # 
  # ######## #   #    ## ##         #########             ##   #     #  #     # 
  #    #     #   #    #   #       ###       #              ##  #     #  #     # 
  #   ###    #   #   ##   ##    ##  #       #               ##  #    #  #     # 
  #  # # #   #   #  ##     ##       #########                   ##  ##   #   #  
  # #  #  ## #   #                  #       #                     ## #    ###   
  #          #   ##############     #       #                                   
  ############                      #########                                   
`;
}
