import bcrypt from "bcrypt";

const cryto = async (pwd) => {
  const salt = await bcrypt.genSalt();

  const password = await bcrypt.hash(pwd, salt);
  return password;
}

const compare = (pwd, hash) => {
  const result = bcrypt.compare(pwd, hash)
  return result
}

export {
  cryto,
  compare,
}