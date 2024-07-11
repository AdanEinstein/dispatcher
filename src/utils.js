import { exec } from "node:child_process";
import { promisify } from "util";

export const execPromise = promisify(exec);

/** @returns {Promise<string[]>} */
export async function getOptions() {
  const command = "arp -a";
  const pattern = /(\d{2,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+[\w-]{17}/gm;
  const { stdout } = await execPromise(command);
  const return_ = []
  for (const match of stdout.matchAll(pattern)){
    return_.push(match.at(1))
  }
  return return_
}

/**
 * 
 * @param {string} ip 
 * @param {string} path 
 */
export function destConcat(ip, path){
    return `\\\\${ip}\\${path}`
}

(async () => {
    const matches = getOptions()
    for await (const match of matches) {
        console.log(match);
    }
})