export class Display {
  static async printComments(comments, speed, format) {
    const printComments = comments.split(format.partition);
    printComments.forEach((comment, index) => {
      setTimeout(() => {
        format.print(comment);
      }, index * speed);
    });
    await this.waitingTime(printComments.length * speed);
  }

  static formatChars = {
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

  static waitingTime(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  static exitIfReceiveCancel() {
    process.on("SIGINT", () => {
      Display.cancelProcess();
    });
  }

  static cancelProcess() {
    console.log("\n今回はここまでにしましょう。");
    Display.frame(Display.cautionNote);
    process.exit(1);
  }

  static async frame(content, waitingTime) {
    console.log(`
--------------------------------------------------------------------------------
${content}
--------------------------------------------------------------------------------
`);
    await Display.waitingTime(waitingTime);
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
