import { v2 as cloudinary } from "cloudinary";

const handleFileUpload = async (file) => {
  try {
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];
    let data;
    await cloudinary.uploader.upload(
      dataUrl,
      {
        public_id: fileName,
        resource_type: "auto",
      },
      (err, result) => {
        if (err) {
          // Handle cloudinary upload error
          console.error("Cloudinary upload error:", err);
          throw new Error("Failed to upload file!");
        }
        data = result.secure_url;
      }
    );
    return { data: data, success: true };
  } catch (error) {
    return { success: false, message: error.message, data: null };
  }
};

export { handleFileUpload };
