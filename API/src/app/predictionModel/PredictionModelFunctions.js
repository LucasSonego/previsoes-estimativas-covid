import { exec } from "child_process";

function asyncExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
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
