import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as path from 'path';
import * as argon from 'argon2';

export const isObjectEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

export const copyObject = (objSrc: any, objDes: any): any => {
  Object.keys(objSrc).forEach(key => {
    objDes[key] = objSrc[key];
  });
  return objDes;
};

export const TypeOrmErrorHandler = err => {
  switch (err.code) {
    case '23505':
      throw new ConflictException('Username Exists');

    default:
      throw new InternalServerErrorException();
  }
};

export const fileName = OldName => {
  return (
    path.basename(OldName, path.extname(OldName)) +
    '-' +
    Date.now() +
    path.extname(OldName)
  );
};

export async function hashString(string): Promise<string> {
  return argon.hash(string, {
    type: argon.argon2d,
    hashLength: 50,
  });
}

export async function verifyHash(string, hash): Promise<boolean> {
  return argon.verify(string, hash);
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
