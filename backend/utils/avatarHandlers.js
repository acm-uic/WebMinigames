import { v2 as cloudinary } from "cloudinary";
// Take 2 parameters: the avatar(file) and the object it would be in
const handleAvatarUpload = async (avatar, object) => {
  try {
    const dataUrl = `data:${avatar.mimetype};base64,${avatar.buffer.toString(
      "base64"
    )}`;
    const fileName = avatar.originalname.split(".")[0];
    await cloudinary.uploader.upload(
      dataUrl,
      {
        public_id: fileName,
        folder: "users/avatar",
        resource_type: "auto",
      },
      (err, result) => {
        if (err) {
          // Handle cloudinary upload error
          console.error("Cloudinary upload error:", err);
          throw new Error("Failed to upload avatar!");
        }
        object.avatar = result.secure_url;
      }
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message, data: null };
  }
};

export { handleAvatarUpload };
