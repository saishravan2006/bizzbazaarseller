import { Lang } from '@/store/useStore';

const BOT_NUMBER = "+918870751384";

export const encodePayloadV2Lite = (
  storeId: string,
  lang: Lang,
  storeName: string,
  codes: string[],
  labels: string[]
): string => {
  const payload = `BIZZ_SELLER_REG_V2_LITE
store_id: ${storeId}
seller_lang: ${lang}
store_name: ${storeName}
store_type_codes: ${codes.join(',')}
store_type_labels: ${labels.join(',')}`;

  return payload;
};

export const openWhatsApp = (payload: string) => {
  const url = `https://wa.me/${BOT_NUMBER}?text=${encodeURIComponent(payload)}`;
  window.open(url, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};