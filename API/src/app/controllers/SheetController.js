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
  data0: "J2",
  casos1: "G2",
  obitos1: "H2",
  recuperados1: "I2",
  data1: "N2",
  offset: "R2",
};

class SheetController {
  async generateSheet(data) {
    let workbook = new Excel.Workbook();
    await workbook.xlsx
      .readFile(`${path.join(__dirname, "../predictionModel/Dados.xlsx")}`)
      .then(() => {
        let worksheet = workbook.getWorksheet("sir");
        console.log(
          `${data.offsetReport.dataValues.dia}`
            .replace("_", "/")
            .replace("_", "/")
        );

        let splitDate0 = `${data.offsetReport.dataValues.dia}`.split("_");
        let data0 = new Date(
          `${splitDate0[YEAR]}-${splitDate0[MONTH]}-${splitDate0[DAY]}`
        );

        let splitDate1 = `${data.dateReport.dataValues.dia}`.split("_");
        let data1 = new Date(
          `${splitDate1[YEAR]}-${splitDate1[MONTH]}-${splitDate1[DAY]}`
        );

        console.log(data0);
        console.log(data1);

        worksheet.getCell(cells.regionalDeSaude).value = data.cityData.nome;
        worksheet.getCell(cells.populacao).value = data.cityData.populacao;
        worksheet.getCell(cells.casos0).value = data.offsetReport.casos;
        worksheet.getCell(cells.casos1).value = data.dateReport.casos;
        worksheet.getCell(cells.obitos0).value = data.offsetReport.obitos;
        worksheet.getCell(cells.obitos1).value = data.dateReport.obitos;
        worksheet.getCell(cells.recuperados0).value =
          data.offsetReport.recuperados;
        worksheet.getCell(cells.recuperados1).value =
          data.dateReport.recuperados;
        worksheet.getCell(cells.data0).value = data0;
        worksheet.getCell(cells.data1).value = data1;
        worksheet.getCell(cells.offset).value = data.offset;

        return workbook.xlsx.writeFile(
          `${path.join(__dirname, "../predictionModel/Dados.xlsx")}`
        );
      });
  }
}

export default new SheetController();
