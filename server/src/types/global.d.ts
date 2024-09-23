import { Request } from 'express';
import { UserDocument } from 'src/types/schemas';

export interface ReqUserObjType extends Request {
  user?: UserDocument | null;
}

export interface DecodedObjType {
  id: string;
  username: string;
}
