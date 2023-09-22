<template>
  <div class="resultComponent">
    <h2 class="title">
      全{{ questionList.length }}問中、{{ correctCount }}問正解です。
    </h2>
    <div class="contents">
      <div class="answers-area">
        <ul>
          <li v-for="(questionInfo, qIndex) in questionList" :key="qIndex">
            <QuestionsQInfo
              :qIndex="qIndex"
              :questionInfo="questionInfo"
              :mode="'answer'"
            />
          </li>
        </ul>
      </div>
      <div class="btns-area">
        <button class="btn" @click="backTop()">終了</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const { questionList, correctCount } = commonStore;

/**
 * トップ画面に戻る
 */
const backTop = () => {
  commonStore.setDispType("top");
};
</script>

<style scoped lang="scss">
.resultComponent {
  .answers-area {
    padding: 15px 0 0 15px;
    background-color: #eaeaea;
    margin-top: 20px;
    border-radius: 15px;
    ul {
      height: 370px;
      overflow: auto;
    }
  }
  .btns-area {
    margin-top: 15px;
    text-align: center;
  }
}
</style>
