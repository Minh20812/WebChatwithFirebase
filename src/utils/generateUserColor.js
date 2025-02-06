export default function generateUserColor(user) {
  // Kullanıcının ismini veya id'sini birleştirerek benzersiz bir string oluşturuyoruz.
  const userIdentifier = user.id || user.name;

  // Benzersiz string'i bir hash'e dönüştürmek için bir basit hash fonksiyonu (FNV-1a Hash).
  let hash = 0;
  for (let i = 0; i < userIdentifier.length; i++) {
    hash = (hash << 5) - hash + userIdentifier.charCodeAt(i);
    hash |= 0; // 32-bit integer'a dönüştürme.
  }

  // Hash değerini bir renk koduna dönüştürmek için RGB formatında bir renk oluşturuyoruz.
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // RGB değerlerini normalize ederek #RRGGBB formatında bir renk döndürüyoruz.
  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}
