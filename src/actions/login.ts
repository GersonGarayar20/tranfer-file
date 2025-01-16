"use server";

export const login = async (password: string) => {
  return password === process.env.PASSWORD;
};
