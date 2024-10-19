import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 24 });

export function generateUid() {
    return uid.rnd();
}