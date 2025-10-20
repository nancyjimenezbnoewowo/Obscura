import { getAddress, hexlify, zeroPadValue } from 'ethers';

let fheInstance: any = null;

export const initializeFHE = async (): Promise<any> => {
  if (fheInstance) {
    return fheInstance;
  }

  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found');
  }

  try {
    const { createInstance, initSDK, SepoliaConfig } = await import('@zama-fhe/relayer-sdk/bundle');
    await initSDK();
    fheInstance = await createInstance(SepoliaConfig);
    return fheInstance;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    if (errorMsg.includes('getKmsSigners') || errorMsg.includes('BAD_DATA')) {
      throw new Error('FHE configuration error');
    }
    throw new Error(`FHE initialization failed: ${errorMsg}`);
  }
};

export const getFHEInstance = (): any => {
  return fheInstance;
};

export const resetFheInstance = (): void => {
  fheInstance = null;
};

export const encryptUint64 = async (
  value: number | bigint,
  contractAddress: string,
  userAddress: string
): Promise<{ data: string; signature: string }> => {
  let fhe = getFHEInstance();
  if (!fhe) {
    fhe = await initializeFHE();
  }
  if (!fhe) throw new Error('Failed to initialize FHE');

  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);
  ciphertext.add64(BigInt(value));

  const { handles, inputProof } = await ciphertext.encrypt();
  const handle = hexlify(handles[0]);
  const proof = hexlify(inputProof);

  return { data: handle, signature: proof };
};

export const encryptUint32 = async (
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ data: string; signature: string }> => {
  let fhe = getFHEInstance();
  if (!fhe) {
    fhe = await initializeFHE();
  }
  if (!fhe) throw new Error('Failed to initialize FHE');

  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);
  ciphertext.add32(value);

  const { handles, inputProof } = await ciphertext.encrypt();
  const handle = hexlify(handles[0]);
  const proof = hexlify(inputProof);

  return { data: handle, signature: proof };
};

export const encryptUint16 = async (
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ data: string; signature: string }> => {
  let fhe = getFHEInstance();
  if (!fhe) {
    fhe = await initializeFHE();
  }
  if (!fhe) throw new Error('Failed to initialize FHE');

  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);
  ciphertext.add16(value);

  const { handles, inputProof } = await ciphertext.encrypt();
  const handle = hexlify(handles[0]);
  const proof = hexlify(inputProof);

  return { data: handle, signature: proof };
};

export const encryptUint8 = async (
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ data: string; signature: string }> => {
  let fhe = getFHEInstance();
  if (!fhe) {
    fhe = await initializeFHE();
  }
  if (!fhe) throw new Error('Failed to initialize FHE');

  const contractAddressChecksum = getAddress(contractAddress);
  const ciphertext = await fhe.createEncryptedInput(contractAddressChecksum, userAddress);
  ciphertext.add8(value);

  const { handles, inputProof } = await ciphertext.encrypt();
  const handle = hexlify(handles[0]);
  const proof = hexlify(inputProof);

  return { data: handle, signature: proof };
};

export const requestDecryption = async (
  contractAddress: string,
  handle: string
): Promise<number> => {
  const fhe = getFHEInstance();
  if (!fhe) throw new Error('FHE not initialized');

  try {
    const values = await fhe.publicDecrypt([handle]);
    const decryptedValue = Number(values[handle]);
    return decryptedValue;
  } catch (error: any) {
    if (error?.message?.includes('Failed to fetch')) {
      throw new Error('Decryption service unavailable');
    }
    if (error?.message?.includes('not authorized')) {
      throw new Error('Unauthorized decryption');
    }
    throw error;
  }
};

export const toContractInput = (encrypted: string): string => {
  return zeroPadValue(encrypted, 32);
};

export const toProofBytes = (signature: string): string => {
  return signature;
};

export const isFheInitialized = (): boolean => {
  return fheInstance !== null;
};
