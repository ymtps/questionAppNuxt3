<template>
  <div class="qInfoComponent">
    <div class="header">
      <p class="title">
        問{{ props.qIndex + 1 }}
        <span
          v-if="
            props.mode === 'answer' &&
            props.questionInfo.answer ===
              commonStore.selectAnswerList[props.qIndex]
          "
          class="answer-correct"
          >: 正解</span
        >
        <span
          v-if="
            props.mode === 'answer' &&
            props.questionInfo.answer !==
              commonStore.selectAnswerList[props.qIndex]
          "
          class="answer-incorrect"
          >: 不正解</span
        >
      </p>
      <p class="question" v-html="props.questionInfo.question"></p>
    </div>
    <div class="contents">
      <ul class="choiceList">
        <li
          v-for="(choice, index) in props.questionInfo.choice"
          :key="index"
          class="choiceList__item"
        >
          <label class="choice">
            <input
              type="radio"
              v-model="selectChoice"
              :value="choice"
              :disabled="
                props.mode === 'answer' && choice !== props.questionInfo.answer
              "
            />
            <span :class="checkCorrectClass(choice)" v-html="choice"></span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { useCommonStore } from "@/store/common";
import { QuestionInterface } from "@/store/common";

const commonStore = useCommonStore();
const props = defineProps({
  qIndex: {
    type: Number,
    default: 0,
  },
  questionInfo: {
    type: Object as PropType<QuestionInterface>,
    default: () => {},
  },
  mode: {
    type: String,
    default: "",
  },
  answerList: {
    type: Array<string>,
    default: () => [],
  },
});
const { questionInfo } = toRefs(props);
let selectChoice = ref("");

watch(questionInfo, () => {
  nextTick(() => {
    initSelectChoice(); // 選択肢の初期値設定
  });
});
watch(selectChoice, (newVal) => {
  commonStore.setSelectChoiceStore(newVal); // 前の画面に戻るボタンの処理用に選択するたびに値を保持
});

/**
 * 選択肢の初期値設定
 *
 * 問題解答画面の場合、初めて表示する問題の場合は先頭の選択肢にチェックが付けるが、一度解答した問題であれば自分が選択した解答にチェックが付く。
 */
const initSelectChoice = () => {
  if (props.mode === "question") {
    selectChoice.value =
      props.answerList[props.qIndex] || props.questionInfo.choice[0];
  } else if (props.mode === "answer") {
    selectChoice.value = props.questionInfo.answer;
  }
};

/**
 * 選択肢のクラス付与処理
 *
 * 正解の選択肢に緑、自分が選択した不正解の選択肢なら赤の背景のクラスを付与
 */
const checkCorrectClass = (choice: string) => {
  if (props.mode !== "answer") {
    return false;
  }

  if (choice === commonStore.selectAnswerList[props.qIndex]) {
    if (choice === props.questionInfo.answer) {
      return "is-correct";
    } else {
      return "is-incorrect";
    }
  } else if (choice === props.questionInfo.answer) {
    return "is-correct";
  }
};

initSelectChoice(); // 選択肢の初期値設定
</script>

<style scoped lang="scss">
.qInfoComponent {
  margin-bottom: 20px;
  .header {
    font-size: 32px;
    .title {
      span {
        font-weight: bold;
        &.answer-correct {
          color: $color-text-answercorrect;
        }
        &.answer-incorrect {
          color: $color-text-incorrect;
        }
      }
    }
  }
  .contents {
    font-size: 24px;
    margin-top: 20px;
    .choiceList {
      &__item {
        .choice {
          span {
            &.is-correct {
              background-color: $color-text-correct;
            }
            &.is-incorrect {
              background-color: $color-text-incorrect;
            }
          }
        }
      }
    }
  }
}
</style>
