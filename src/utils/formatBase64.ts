export function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(
    new Uint8Array(codeUnits.buffer).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, '')
  );
  // return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

export function fromBinary(encoded: string) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export function formatBase64(base64: string) {
  const bin = toBinary(atob(base64));
  const str = fromBinary(bin);
  return str;
}
