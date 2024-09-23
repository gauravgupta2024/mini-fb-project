export interface updateUserBodyObjType {
  username?: string;
  email?: string;
  avatar?: avatarType;
}

export interface avatarObjType {
  public_id: string;
  url: string;
}
