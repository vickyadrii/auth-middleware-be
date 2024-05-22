import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECREY_KEY || "";

export const generateToken = (id?: number) => {
  const token = jwt.sign({ id: id }, jwtSecretKey, {
    expiresIn: "24h",
  });
  return token;
};
