import bcrypt from "bcryptjs";

export const hashToken = async (token) => {
  return await bcrypt.hash(token, 10);
};

export const compareToken = async (token, hashedToken) => {
  return await bcrypt.compare(token, hashedToken);
};