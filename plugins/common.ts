export interface MyPluginInterface {
  shuffleArray: (array: any) => any;
}

class MyPlugin implements MyPluginInterface {
  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = array[i];

      array[i] = array[r];
      array[r] = tmp;
    }

    return array;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      commonFunc: new MyPlugin(),
    },
  };
});
