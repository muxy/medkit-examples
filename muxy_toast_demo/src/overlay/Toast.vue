<template>
  <div>
    <transition name="fade">
      <div v-if="show" class="toasty">
        <img ref="thumbimage" :src="imageurl"/>
        <div class="body">
          <h1>{{ title }}</h1>
          <h2>{{ body }}</h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// This is the main access point to this component.
module.exports = {
  // Any fields added to your `data` object are accessible on `this` in your
  // class methods or directly in your template elements.
  data: () => ({
    title: '',
    body: '',
    messageHandler: null,
    show: false,
  }),

  // Any methods defined here can be called from your template elements.
  methods: {
    showIncomingMessage(data) {
      console.log(data);
      this.title = data.title;
      this.body = data.body;
      this.imageurl = data.image;

      let img = new Image();
      img.onload = () => { 
        this.show = true;

        setTimeout(() => {
          this.show = false;
        }, 10000);
       };
      img.src = data.image;
    }
  },

  created() {
    // `this.$sdk.listen()` will establish a callback handler to call whenever the provided event
    // is received by this viewer. Any JSON payload sent with the
    // event will be passed to the callback function as the first parameter.
      this.$sdk.loaded().then(() => {
        this.messageHandler = this.$sdk.listen('show_awesome_message', this.showIncomingMessage);
      });
  },

  destroyed() {
    if (this.messageHandler) {
      // `this.$sdk.unlisten()` removes the event callback handler. The callback you specified
      // in the `listen()` function will no longer be called when the specified event
      // is received.
      this.$sdk.unlisten(this.messageHandler);
    }
  }
};
</script>

<style lang="scss">
// The style section will be applied to your template above. We are setting `lang="scss"` so
// that we can use any SCSS features here and have them automatically converted to standard
// CSS before display.
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.toasty {
  background-color: rgba(40, 40, 40, 0.9);
  display: flex;
  align-items: center;
  user-select: none;
  max-width: 450px;

  .body {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    vertical-align: middle;

    h1, h2 {
      color: white;
      margin: 0;
      max-width: 20vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    h1 { font-size: 14px; }
    h2 { font-size: 12px; }
  }
}
</style>