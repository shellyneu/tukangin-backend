const Tukang = require("../models/tukangModel");

const validateTukangAccount = async (req, res) => {
  let updatedTukang;

  try {
    const tukangId = req.user.id;
    const { deskripsi } = req.body;
    const ktpFileName = req.file ? req.file.filename : null;

    if (!deskripsi && !ktpFileName) {
      return res.status(400).json({
        success: false,
        message: "Mohon masukkan deskripsi dan/atau unggah foto KTP",
      });
    }

    const updateObject = {};
    if (deskripsi) {
      updateObject.deskripsi = deskripsi;
    }
    if (ktpFileName) {
      updateObject.ktp = `${process.env.BASE_URL}/ktp/${ktpFileName}`;
      updateObject.statusValidate = true;
    }

    updatedTukang = await Tukang.update(updateObject, {
      where: { id: tukangId },
    });

    if (updatedTukang[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Tukang tidak ditemukan",
      });
    }
    updatedTukang = await Tukang.findByPk(tukangId);

    res.status(200).json({
      success: true,
      data: {
        _id: updatedTukang.id,
        nama: updatedTukang.nama,
        noHP: updatedTukang.noHP,
        email: updatedTukang.email,
        deskripsi: updatedTukang.deskripsi,
        fotoKtp: updatedTukang.ktp,
        statusValidate: updatedTukang.statusValidate,
      },
      message: "Validasi akun berhasil",
      status: 200,
    });
  } catch (error) {
    console.error(error);

    if (!updatedTukang) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

module.exports = {
  validateTukangAccount,
};
