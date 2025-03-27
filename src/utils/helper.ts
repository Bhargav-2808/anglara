import crypto from 'crypto';
import { paymentkeyIndex } from './constants/constant';

export const generateChecksum = (payload: string, endpoint: string, apiKey: string): string => {
  const stringToHash = payload + endpoint + apiKey;
  const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
  return `${sha256}###${paymentkeyIndex}`;
};

export const encodeMetadata = (metadata: object): string => {
  const metadataStr = JSON.stringify(metadata);
  return Buffer.from(metadataStr).toString('base64');
};

export const decodeMetadata = (encodedMetadata: string): object => {
  const metadataStr = Buffer.from(encodedMetadata, 'base64').toString('utf-8');
  return JSON.parse(metadataStr);
};
