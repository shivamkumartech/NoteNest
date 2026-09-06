import crypto from "crypto";

export const hashToken = (token) => {
  return crypto
    .createHmac("sha256", process.env.JWT_REFRESH_SECRET)
    .update(token)
    .digest("hex");
};

export const compareToken = (token, hashedToken) => {
  const hash = hashToken(token);
  const hashBuffer = Buffer.from(hash);
  const storedBuffer = Buffer.from(hashedToken);

  if (hashBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashBuffer, storedBuffer);
};
