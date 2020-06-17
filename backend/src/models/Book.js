const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  pages: {
    type: Number,
    required: true,
  },

  summary: String,

  cover: {
    key: String,
    name: String,
    url: String,
  },

  review: Number,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

// Saving the cover url with the local url
BookSchema.pre("save", function () {
  if (!this.cover.url) {
    this.cover.url = `${process.env.APP_URL}/files/${this.cover.key}`;
  }
});

// Deleting the file from AWS S3
BookSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.cover.key,
      })
      .promise()
      .then((response) => {
        console.log(response.status);
      })
      .catch((response) => {
        console.log(response.status);
      });
  }
  //Deleting the file locally
  else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.cover.key)
    );
  }
});

mongoose.model("Book", BookSchema);
