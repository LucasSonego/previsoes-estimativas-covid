import { exec } from "child_process";
import log from "../util/log";

function asyncExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        log("warn: error at asyncExec");
        // console.log(error)
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

export async function generatePrediction(timestamp) {
  await asyncExec(`cd ${__dirname} && julia sir_regionais_v2.jl ${timestamp}`);
}

export async function deleteSheets(timestamp) {
  await asyncExec(
    `cd ${__dirname} && rm ${timestamp}.xlsx && rm ${timestamp}Resultados.xlsx`
  );
}
