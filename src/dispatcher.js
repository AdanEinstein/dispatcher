import Constants from "./constants.js";
import "./types.js";
import { destConcat, execPromise } from "./utils.js";

export class Dispatcher {
  /** @type {Input} */
  #input;

  /** @param {Input} input  */
  constructor(input) {
    this.#input = input;
  }

  /** @param {(ip: string) => void} callback  */
  async run(callback = (_) => {}) {
    for (const ip of this.#input.ips) {
      const rmKey = `cmdkey /delete:${ip}`;
      const addKey = `cmdkey /add:{ip} /user:${Constants.ADM_CREDENTIALS.user} /pass:${Constants.ADM_CREDENTIALS.password}`;
      const copyCmd = `xcopy "${this.#input.filePath}" "${destConcat(
        ip,
        this.#input.destPath
      )}" /Y /I`;
      await this.#executeCmd(rmKey);
      await this.#executeCmd(addKey);
      await this.#executeCmd(copyCmd);
      await this.#executeCmd(rmKey);
      callback(ip)
    }
  }

  /** @param {string} cmd  */
  async #executeCmd(cmd) {
    try {
        await execPromise(cmd);
    } catch (error) {}
  }
}
