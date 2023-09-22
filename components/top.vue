<template>
  <div class="topComponent">
    <h2 class="title">{{ title }}</h2>
    <div class="contents">
      <div class="select_question">
        <p>問題を選択</p>
        <ul>
          <li
            v-for="(fileInfo, index) in settingOption.questionPaths"
            :key="index"
            @click="selectQuestion(fileInfo.filePath)"
            :class="{ selected: selectQuestionPath === fileInfo.filePath }"
          >
            {{ fileInfo.title }}
          </li>
        </ul>
      </div>
      <div class="btns-area">
        <button
          class="btn"
          @click="readQuestions()"
          :disabled="!selectQuestionPath"
        >
          {{ btnName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommonStore, QuestionInterface } from "@/store/common";

const commonStore = useCommonStore();
const { settingOption } = storeToRefs(commonStore);
let title = "";
let btnName = "";
let selectQuestionPath = ref("");

/**
 * タイトルとボタン名を設定
 *
 * 設定ファイルの内容からタイトルとボタン名を設定
 */
const setSettingName = () => {
  title = commonStore.settingOption.title;
  btnName = commonStore.settingOption.btnName;
};

const selectQuestion = (filePath: string) => {
  // 既に選択している場合は選択状態を解除
  if (filePath === selectQuestionPath.value) {
    selectQuestionPath.value = "";
  } else {
    selectQuestionPath.value = filePath;
  }
};

/**
 * 問題情報を読み込む
 */
const readQuestions = async () => {
  useFetch(selectQuestionPath.value)
    .then(async (response: any) => {
      setReadQuestions(response.data._rawValue.questionList); // 読み込んだ問題情報をstoreに格納
      commonStore.setDispType("questions");
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * 読み込んだ問題情報をstoreに格納
 */
const setReadQuestions = (questionList: QuestionInterface[]) => {
  const { $commonFunc } = useNuxtApp();

  // 問題をランダムにする
  if (settingOption.value.random) {
    questionList = $commonFunc.shuffleArray(questionList);
  }

  // 選択肢をランダムにする
  if (settingOption.value.choiceRandom) {
    questionList.forEach((questionInfo: QuestionInterface) => {
      questionInfo.choice = $commonFunc.shuffleArray(questionInfo.choice);
    });
  }

  commonStore.setQuestionList(questionList);
};

setSettingName();
</script>

<style scoped lang="scss">
.topComponent {
  .title {
    margin-top: 50px;
    font-size: 60px;
    color: red;
    text-align: center;
  }
  .contents {
    .select_question {
      margin-top: 30px;
      padding: 0 200px;
      ul {
        border: 1px solid;
        max-height: 200px;
        li {
          height: 30px;
          line-height: 30px;
          padding-left: 20px;
          border: 1px solid;
          cursor: pointer;
          &:hover {
            background-color: greenyellow;
          }
          &.selected {
            background-color: greenyellow;
          }
        }
      }
    }
    .btn {
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      text-align: center;
      bottom: 30px;
      &:disabled {
        cursor: default;
        color: #ffffff;
        border-color: #ffffff;
        background-color: gray;
      }
    }
  }
}
</style>
