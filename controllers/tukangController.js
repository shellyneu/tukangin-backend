const Tukang = require("../models").Tukang;
const User = require("../models").User;

const validateTukangAccount = async (req, res) => {
  let createdTukang;

  try {
    const userId = req.user.id;
    const { deskripsi } = req.body;
    const ktpFileName = req.file ? req.file.filename : null;

    if (
      !deskripsi
      /*!ktpFileName*/
    ) {
      return res.status(400).json({
        success: false,
        message: "Mohon masukkan deskripsi dan unggah foto KTP",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const createObject = {
      userId: userId,
      nama: user.nama,
      noHP: user.noHP,
      email: user.email,
      deskripsi: deskripsi,
      ktp: `${process.env.BASE_URL}/ktp/${ktpFileName}`,
      statusValidate: true,
    };

    createdTukang = await Tukang.create(createObject);

    res.status(201).json({
      success: true,
      data: {
        _id: createdTukang.id,
        nama: createdTukang.nama,
        noHP: createdTukang.noHP,
        email: createdTukang.email,
        deskripsi: createdTukang.deskripsi,
        fotoKtp: createdTukang.ktp,
        statusValidate: createdTukang.statusValidate,
      },
      message: "Validasi akun berhasil",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    if (!createdTukang) {
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
