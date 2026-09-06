import crypto from "crypto";

export const hashToken = (token) => {
  return crypto
    .createHmac("sha256", process.env.JWT_REFRESH_SECRET)
    .update(token)
    .digest("hex");
};

export const compareToken = (token, hashedToken) => {
  const hash = hashToken(token);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedToken));
};