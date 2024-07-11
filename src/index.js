import ProgressBar from "progress";
import { getOptions } from "./utils.js";
import { View } from "./view.js";
import { Dispatcher } from "./dispatcher.js";

async function main() {
    const options = await getOptions()
    const view = new View(options)
    const input = await view.getInput()
    const bar = new ProgressBar('! Disparando p/ :ip [:bar] :percent :etas', { total: input.ips.length })
    bar.render()
    const dispatcher = new Dispatcher(input)
    await dispatcher.run((ip) => bar.tick(1, {
        ip: ip
    }))
    bar.terminate()
    console.log('> Arquivos disparados.');
}

main()