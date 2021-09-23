import Fails from "../models/Fails";

class FailController {
  async storeFail(city, date, offsetDate) {
    await Fails.create({
      municipio: city,
      data: date,
      dataOffset: offsetDate,
    });
    return;
  }

  async findFail(city, date, offsetDate) {
    let fail = await Fails.findOne({
      where: {
        municipio: city,
        data: date,
        dataOffset: offsetDate,
      },
    });

    return fail;
  }
}

export default new FailController();
