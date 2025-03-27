type sub = {
  id: string;
  role: string;
};

export type jwtSignPayLoad = {
  kind: string;
  sub: sub;
  iat: number;
  exp: number;
};

export type role = {
  _id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  description?: string;
};

export type user = {
  _id: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  password: string;
  tasks?: string[]
};
