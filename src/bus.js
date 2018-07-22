import Vue from 'vue';

Vue.prototype.$bus = new Vue();

//講師建議只要使event bus 的都統一寫在這，而且要註明使用方法

// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式

