export type ZipEntry = {
  name: string
  data: string | Uint8Array
}

const encoder = new TextEncoder()

const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[n] = c >>> 0
  }
  return table
})()

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function u16(value: number) {
  const out = new Uint8Array(2)
  new DataView(out.buffer).setUint16(0, value, true)
  return out
}

function u32(value: number) {
  const out = new Uint8Array(4)
  new DataView(out.buffer).setUint32(0, value >>> 0, true)
  return out
}

function bytes(value: string | Uint8Array): Uint8Array<ArrayBuffer> {
  if (typeof value === "string") return encoder.encode(value)
  const copy = new Uint8Array(value.byteLength)
  copy.set(value)
  return copy
}

export function createStoredZip(entries: ZipEntry[]) {
  const localParts: BlobPart[] = []
  const centralParts: BlobPart[] = []
  let offset = 0

  for (const entry of entries) {
    const name = encoder.encode(entry.name)
    const data = bytes(entry.data)
    const crc = crc32(data)

    const localHeader = new Blob([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      name,
    ])

    localParts.push(localHeader, data)

    const centralHeader = new Blob([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      name,
    ])

    centralParts.push(centralHeader)
    offset += localHeader.size + data.length
  }

  const central = new Blob(centralParts)
  const end = new Blob([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(entries.length),
    u16(entries.length),
    u32(central.size),
    u32(offset),
    u16(0),
  ])

  return new Blob([...localParts, central, end], { type: "application/zip" })
}

export async function sha256Hex(value: string | Uint8Array) {
  const digest = await crypto.subtle.digest("SHA-256", bytes(value))
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("")
}
