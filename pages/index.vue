<template>
  <div class="main">
    <div class="top">
      <Top v-if="dispType === 'top'" />
      <Questions v-if="dispType === 'questions'" />
      <Result v-if="dispType === 'result'" />
    </div>
  </div>
</template>

<script lang="ts">
import settingsJsonPath from "~/src/settings.json"; // 設定ファイル
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const commonStore = useCommonStore();
    const { dispType } = storeToRefs(commonStore);

    /**
     * 初期設定処理
     */
    const readSettings = () => {
      commonStore.setSettingOption(settingsJsonPath); // 設定オプション情報をstoreに格納
      commonStore.setDispType("top"); // トップコンポーネントを表示
    };

    readSettings();

    return {
      dispType,
    };
  },
});
</script>

<style scoped>
.main {
  width: 80%;
  min-height: 550px;
  border: 1px solid;
  border-radius: 15px;
  position: relative;
  top: 40px;
  left: 0;
  margin: auto;
  padding: 30px;
  background-color: #ffffff;
}
</style>
