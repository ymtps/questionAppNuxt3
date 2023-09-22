<template>
  <div class="questionsComponent">
    <div class="header">
      <button
        class="btn btn-back"
        @click="showPreviousQuestion()"
        :disabled="qIndex === 0"
      >
        前の問題に戻る
      </button>
    </div>
    <div class="contents">
      <div class="question-area">
        <QuestionsQInfo
          :qIndex="qIndex"
          :questionInfo="questionData"
          :answerList="selectAnswerList"
          :mode="'question'"
        />
      </div>
      <div class="btn-area">
        <button class="btn" @click="answerQuestion(qIndex + 1)">解答</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore, QuestionInterface } from "@/store/common";

const commonStore = useCommonStore();
let questionData: QuestionInterface = {
  no: 0,
  question: "",
  choice: [],
  answer: "",
};
let qIndex = ref(0);
let selectChoice = "";
let correctCount = 0;
let selectAnswerList: string[] = [];

/**
 * 表示する問題情報をセット
 */
const showQuestion = () => {
  questionData = commonStore.getQuestionList[qIndex.value];
};

/**
 * 解答ボタン押下処理
 *
 * 答え合わせをして、次の問題を表示。最後の問題の場合は解答結果画面を表示。
 *
 * @param {number} nextIndex 次の問題のインデックス
 */
const answerQuestion = (nextIndex: number) => {
  checkCorrectAnswer();
  qIndex.value = nextIndex;

  if (commonStore.questionList[qIndex.value]) {
    selectChoice = "";
    showQuestion();
  } else {
    commonStore.setCorrectCount(correctCount);
    commonStore.setSelectAnswerList(selectAnswerList);
    commonStore.setDispType("result");
  }
};

/**
 * 前の問題に戻るボタン押下処理
 *
 * 前の問題を表示。選択肢のラジオボタンも自分が解答した選択肢の値にする。
 */
const showPreviousQuestion = () => {
  qIndex.value = qIndex.value - 1; // 問題のインデックスを一つ前に設定
  showQuestion(); // 前の問題を表示
  selectChoice = commonStore.selectAnswerList[qIndex.value]; // 前の問題で選択した選択肢を設定
};

/**
 * 選択した問題の答えチェック
 *
 * 正解の場合は正解数をインクリメントする。解答リストに自分が選択した解答を追加。
 */
const checkCorrectAnswer = () => {
  if (commonStore.getSelectChoiceStore === questionData.answer) {
    correctCount++;
  }

  commonStore.selectAnswerList[qIndex.value] = commonStore.getSelectChoiceStore;
};

showQuestion(); // 表示する問題情報をセット
</script>

<style scoped lang="scss">
.questionsComponent {
  .header {
    height: 30px;
  }
  .contents {
    margin-top: 10px;
  }
}
</style>
