
import STORAGE_DATA from "@/constants/storage-constants";
import storageAPI from "@/service/api/storageAPI";

function language() {
  return storageAPI.get(STORAGE_DATA.CONFIGURATIONS.LANG.key) || 'en';
}

export default language;