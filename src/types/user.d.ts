export interface IUser {
  name?: string;
  email: string;
  password: string;
};

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAuth {
  name: string;
  email: string;
  id: number | string;
}

