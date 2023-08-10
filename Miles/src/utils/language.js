
import { STORAGE_DATA } from "@/constants/global-constants";
import storageAPI from "@/service/api/storageAPI";

function language() {
  return storageAPI.get(STORAGE_DATA.CONFIGURATIONS.LANG.key) || 'br';
}

export default language;