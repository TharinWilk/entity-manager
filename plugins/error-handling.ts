export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error: any, instance, info) => {
    console.error(error, instance, info, "Caught in error plugin");

    const toast = useToast();
    toast.create({ message: error.message, type: "error" });
  };
});
