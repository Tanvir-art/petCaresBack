export type user = {
  name: string;
  email: string;
  password: string;
  image: string;
  follower: number;
  following: number;
  role: "admin" | "user";
};
