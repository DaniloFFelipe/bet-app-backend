export class User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export class Session {
  user: User;
  token: string;
}

export class AuthCode {
  token: string;
}
