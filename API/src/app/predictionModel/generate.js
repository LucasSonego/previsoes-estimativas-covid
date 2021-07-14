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

export default async function generatePrediction() {
  await asyncExec(`cd ${__dirname} && julia sir_regionais_v2.jl`);
}
