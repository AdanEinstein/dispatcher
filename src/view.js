import "./types.js";
import inquirer from "inquirer";
import fs from "node:fs";

export class View {
  /** @type {string[]} */
  #options;

  /** @param {string[]} options  */
  constructor(options) {
    this.#options = options;
  }

  /** @returns {Promise<Input>} */
  async getInput() {
    return inquirer.prompt([
      {
        type: "input",
        name: "filePath",
        message: "Informe o caminho do arquivo?",
        validate(input) {
          const done = this.async();
          if (fs.existsSync(input)) done(null, true);
          else done("Caminho inválido");
        },
      },
      {
        type: "checkbox",
        name: "ips",
        message: "Selecione os IPs de destino",
        choices: this.#options,
        validate(input) {
          const done = this.async();
          if (!!input.length) done(null, true);
          else done("Necessário selecionar pelo menos um item");
        },
      },
      {
        type: "input",
        name: "destPath",
        message: "Informe o caminho padrão de destino?",
        default: 'c\\temp',
        validate(input) {
          const done = this.async();
          if (/^\w+[\\].*/.test(input)) done(null, true);
          else done("Caminho inválido");
        },
      },
    ]);
  }
}

(async () => {
  const view = new View(["1", "2", "3", "4", "5"]);
  const returns = await view.getInput();
  console.log(returns);
})
