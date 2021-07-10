import Excel from "exceljs";
import path from "path";

let cells = {
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
        worksheet.getCell(cells.data0).value =
          `${data.offsetReport.dataValues.dia}`
            .replace("_", "/")
            .replace("_", "/");
        worksheet.getCell(cells.data1).value =
          `${data.dateReport.dataValues.dia}`
            .replace("_", "/")
            .replace("_", "/");
        worksheet.getCell(cells.offset).value = data.offset;

        return workbook.xlsx.writeFile(
          `${path.join(__dirname, "../predictionModel/Dados.xlsx")}`
        );
      });
  }
}

export default new SheetController();
