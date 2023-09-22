// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true },
  // 使用するscssファイルを指定
  css: ["~/assets/scss/common.scss", "~/assets/css/reset.css"],
  // Viteのビルドの際に、SCSSのパーシャルファイルを読み込むよう指定する
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/scss/_palette.scss";@import "@/assets/scss/_colors.scss";',
        },
      },
    },
  },
});
