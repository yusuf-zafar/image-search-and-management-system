const Image = require("../models/image");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const imageUrl =
      Date.now() + "_" + req.body.title + path.extname(file.originalname);
    cb(null, imageUrl);
  },
});

const upload = multer({ storage });

exports.uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      const image = new Image({
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords
          .trim()
          .replace(/\s+/g, ",")
          .split(",")
          .filter((keyword) => keyword !== ""),
        tags: req.body.tags,
        imageUrl: path.resolve(__dirname, "../uploads", req.file.filename),
        name: req.file.filename,
      });

      const newImage = await image.save();
      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.searchImage = async (req, res) => {
  try {
    const {
      title,
      keywords,
      sortField,
      sortOrder,
      page,
      pageSize,
      fromDate,
      toDate,
    } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (keywords) {
      const keywordsArray = keywords
        .trim()
        .replace(/\s+/g, ",")
        .split(",")
        .filter((keyword) => keyword !== "");
      //  console.log(keywordsArray)
      query.keywords = { $in: keywordsArray };
    }

    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);

    if (fromDate && toDate) {
      if (fromDate === toDate) {
        query.createdAt = {
          $gte: new Date(fromDate),
          $lte: endDate,
        };
      } else {
        query.createdAt = {
          $gte: new Date(fromDate),
          $lte: endDate,
        };
      }
    } else if (fromDate) {
      query.createdAt = { $gte: new Date(fromDate) };
    } else if (toDate) {
      query.createdAt = { $lte: endDate };
    }

    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const totalCount = await Image.countDocuments(query);
    const images = await Image.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ images, totalCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
