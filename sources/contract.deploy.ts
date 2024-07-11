import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress, Dictionary } from "@ton/core";
import { MiniTonMatchContract } from "./output/MiniTon_MiniTonMatchContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "MiniTon_MiniTonMatchContract.pkg";
    // let owner = Address.parse("kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB");
    let init = await MiniTonMatchContract.init(1n,
        Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool())
            .set(Address.parse('UQAw3vkK0uTGHg8d8nHrgkag47htKds3riXivjk67FU32qhh'), true)
    );

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
