const authorizeUser = (userId, authorId) => {
  try {
    if (String(userId) !== String(authorId)) throw new Error("Access denied!");
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message, data: null };
  }
};

export { authorizeUser };
