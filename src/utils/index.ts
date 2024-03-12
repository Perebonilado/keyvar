import { v4 as uuidv4 } from 'uuid';

export const generateUUID = (): string => {
  return uuidv4();
};

export const replaceAllSpacesInStringWithHyphen = (str: string) => {
  return str.replace(/\s+/g, '-');
};
