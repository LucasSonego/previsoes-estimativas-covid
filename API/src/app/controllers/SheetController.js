import Excel from "exceljs";
import path from "path";

const DAY = 0;
const MONTH = 1;
const YEAR = 2;

const cells = {
  regionalDeSaude: "B2",
  populacao: "C2",
  casos0: "D2",
  obitos0: "E2",
  recuperados0: "F2",
  suscetiveis0: "K2",
  infectados0: "L2",
  removidos0: "M2",
  data0: "J2",
  casos1: "G2",
  obitos1: "H2",
  suscetiveis1: "O2",
  infectados1: "P2",
  removidos1: "Q2",
  recuperados1: "I2",
  data1: "N2",
  offset: "R2",
  perc_obt: "S2",
};

class SheetController {
  async generateSheet(data, timestamp) {
    const cityData = data.cityData.dataValues;
    const dateReport = data.dateReport.dataValues;
    const offsetReport = data.offsetReport.dataValues;

    let workbook = new Excel.Workbook();
    await workbook.xlsx
      .readFile(`${path.join(__dirname, "../predictionModel/Dados.xlsx")}`)
      .then(() => {
        let worksheet = workbook.getWorksheet("sir");

        let splitDate0 = `${offsetReport.dia}`.split("_");
        let data0 = new Date(
          `${splitDate0[YEAR]}-${splitDate0[MONTH]}-${splitDate0[DAY]}`
        );

        let splitDate1 = `${dateReport.dia}`.split("_");
        let data1 = new Date(
          `${splitDate1[YEAR]}-${splitDate1[MONTH]}-${splitDate1[DAY]}`
        );

        worksheet.getCell(cells.regionalDeSaude).value = cityData.nome;
        worksheet.getCell(cells.populacao).value = cityData.populacao;
        worksheet.getCell(cells.casos0).value = offsetReport.casos;
        worksheet.getCell(cells.casos1).value = dateReport.casos;
        worksheet.getCell(cells.obitos0).value = offsetReport.obitos;
        worksheet.getCell(cells.obitos1).value = dateReport.obitos;
        worksheet.getCell(cells.recuperados0).value = offsetReport.recuperados;
        worksheet.getCell(cells.recuperados1).value = dateReport.recuperados;
        worksheet.getCell(cells.data0).value = data0;
        worksheet.getCell(cells.data1).value = data1;
        worksheet.getCell(cells.offset).value = data.offset;

        worksheet.getCell(cells.suscetiveis0).value =
          cityData.populacao - offsetReport.casos;
        worksheet.getCell(cells.suscetiveis1).value =
          cityData.populacao - dateReport.casos;

        worksheet.getCell(cells.infectados0).value =
          offsetReport.casos - offsetReport.obitos - offsetReport.recuperados;
        worksheet.getCell(cells.infectados1).value =
          dateReport.casos - dateReport.obitos - dateReport.recuperados;

        worksheet.getCell(cells.removidos0).value =
          offsetReport.obitos + offsetReport.recuperados;
        worksheet.getCell(cells.removidos1).value =
          dateReport.obitos + dateReport.recuperados;

        worksheet.getCell(cells.perc_obt).value =
          dateReport.obitos / (dateReport.obitos + dateReport.recuperados);

        return workbook.xlsx.writeFile(
          `${path.join(__dirname, `../predictionModel/${timestamp}.xlsx`)}`
        );
      });
  }

  async getSheetData(city, timestamp) {
    let workbook = new Excel.Workbook();
    let predictionData = [];
    await workbook.xlsx
      .readFile(
        `${path.join(
          __dirname,
          `../predictionModel/${timestamp}Resultados.xlsx`
        )}`
      )
      .then(() => {
        var worksheet = workbook.getWorksheet(`${city}`);
        worksheet.eachRow({}, (row, rowNumber) => {
          if (rowNumber > 1) {
            let rowData = {
              dia: row.values[1],
              suscetiveis: row.values[2],
              infectados: row.values[3],
              removidos: row.values[4],
              recuperados: row.values[5],
              obitos: row.values[6],
            };
            predictionData.push(rowData);
          }
        });
      });
    return predictionData;
  }
}

export default new SheetController();
