export interface RegisterResponseBodySuccessType {
  success: boolean;
  msg?: string;
  user: {
    username: string;
    email: string;
    password: string;
    posts: string[];
    comments_added: string[];
    friends: string[];
  };
}

interface ErrorResponse {
  data: {
    success: boolean;
    msg: string;
  };
  status: number;
}

export interface RegisterRequestBodyType {
  username: string;
  email: string;
  password: string;
}
