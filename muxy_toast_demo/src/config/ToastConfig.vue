<template>
  <div class="toast-demo-config">
    <h1>Toast Config</h1>

    <div class="form-group">
      Random Image Type
      <select class="form-select" v-model="imageType">
        <option v-for="option in imageTypeChoices" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="image-demo">
      <!--
        The demoImageURL computed value will automatically update when the imageType field
        changes above.
      -->
      <img :src="demoImageURL" />
      <em>{{ demoImageURL }}</em>
    </div>

    <button class="btn btn-primary" @click="save">Save</button>
  </div>
</template>

<script>
const imageTypeChoices = [
  'Abstract', 'Animals', 'Business', 'Cats', 'City',
  'Fashion', 'Food', 'Nature', 'Nightlife', 'Sports',
  'People', 'Technics', 'Transport'
];

// This is the main access point to this component.
export default {
  // Any fields added to your `data` object are accessible on `this` in your class methods or
  // directly in your template elements.
  data: () => ({
    imageTypeChoices,
    imageType: imageTypeChoices[1]
  }),

  // Computed functions are reactive and will automatically update when any data fields
  // they reference change.
  computed: {
    demoImageURL() {
      return `https://lorempixel.com/64/64/${this.imageType.toLowerCase()}`;
    }
  },

  // Any methods defined here can be called from your template elements.
  methods: {
    save() {
      this.$sdk.setChannelState({
        image_type: this.imageType
      });
    }
  },

  created() {
    // Fetch any existing config when the component is created
    this.$sdk.loaded().then(() => {
      this.$sdk.getChannelState((state) => {
        this.imageType = state.image_type;
      });
    });
  }
};
</script>

<style lang="scss">
// The style section will be applied to your template above. We are setting `lang="scss"` so that
// we can use any SCSS features here and have them automatically converted to standard CSS
// before display.
.toast-demo-config {
  margin: 0;
  padding: 10px;
  max-width: 350px;

  .image-demo {
    margin: 10px 0;

    img {
      display: block;
      height: 64px;
      margin-bottom: 5px;
      width: 64px;
    }
  }

  .game-auth {
    width: 80%;
    margin: 30px auto;
  }
}
</style>