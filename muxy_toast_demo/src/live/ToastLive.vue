<template>
  <div class="toast-demo-live">
    <div class="form-group">
      <label class="form-label" for="input-title">Title</label>
      <input class="form-input" type="text" id="input-title" placeholder="Name" v-model="title" >
      <label class="form-label" for="input-Message">Message</label>
      <input class="form-input" type="text" id="input-Message" placeholder="Message" v-model="body" >
    </div>

    <div class="action">
      <!-- The button simply calles `sendMessageToAllViewers` each time it is clicked. -->
      <button class="btn btn-primary" @click="sendMessageToAllViewers">
        Send Message To All&nbsp;Viewers
      </button>

      <small>(with a random {{ this.imageType }} image)</small>
    </div>
  </div>
</template>

<script>
// This is the main access point to this component.
export default {
  // Any fields added to your `data` object are accessible on `this` in your
  // class methods or directly in your template elements.
  data: () => ({
    title: '',
    body: '',
    imageType: ''
  }),

  created() {
    this.$sdk.loaded().then(() => {
      this.$sdk.getChannelState((state) => {
        this.imageType = state.image_type;
      });
    });
  },

  // Any methods defined here can be called from your template elements.
  methods: {
    sendMessageToAllViewers() {
      // The `sdk.send` function can be used by the broadcaster to send any messages and optional
      // payload to all viewers. Each viewer will receive this message, usually within seconds
      // of calling `send`.
      this.$sdk.send('show_awesome_message', {
        title: this.title,
        body: this.body,
        image: `https://lorempixel.com/64/64/${this.imageType.toLowerCase()}#${new Date().getTime()}`
      });
    }
  }
};
</script>

<style lang="scss">
// The style section will be applied to your template above. We are setting `lang="scss"` so
// that we can use any SCSS features here and have them automatically converted to standard
// CSS before display.
.toast-demo-live {
  margin: 0;
  padding: 5px;

  .action {
    button { width: 100%; }

    small {
      color: #777;
      display: block;
      margin-top: 5px;
      text-align: center;
      text-transform: lowercase;
      width: 100%;
    }
  }
}
</style>