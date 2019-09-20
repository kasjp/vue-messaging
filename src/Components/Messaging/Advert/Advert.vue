<template>
  <div>
    <div v-if="isTablet" class="tablet-back" @click="back">
      <img
        src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_97-512.png"
      />
    </div>
    <div v-if="advert">
      <div class="advertTitle">{{advert.EnglishTitle}}</div>
      <div class="advert-img">
        <div v-for="(image,i) in advert.ThumbnailImageUrlList" :key="image">
          <img :src="image" v-show="activeImage===i" :style="imageStyle" />
        </div>
        <div class="images-count">{{activeImage+1}}/{{advert.ThumbnailImageUrlList.length}}</div>
        <div @click="activeImage!=0?activeImage--:''" class="prevImage">prev</div>
        <div
          @click="activeImage!=advert.ThumbnailImageUrlList.length-1?activeImage++:''"
          class="nextImage"
        >next</div>
        <div class="clearfix"></div>
      </div>
      <div class="advert-information">
        <ul>
          <li>Price: € {{advert.PriceRental}}</li>
          <li>
            Surface: {{advert.Surface}} m
            <sup>2</sup>
          </li>
          <li>Viewing: {{advert.PublicationDateInformation}}</li>
        </ul>
        <!-- {{conversation.advert.address}} - €{{conversation.advert.price}} - {{conversation.advert.size}}
              m
        <sup>2</sup>-->
        <div class="advert-description">{{advert.EnglishDescription}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeConversationId: {
      type: Number,
      default: 0
    },
    conversation: {
      type: Object
    },
    advertId: {
      type: Number,
      default: 0
    },
    isTablet: {
      type: Boolean,
      default: false
    }
  },
  name: "Advert",
  data() {
    return {
      advert: false,
      activeImage: "",
      imageStyle: {
        width: this.isTablet ? "320px" : "100%"
      }
    };
  },
  methods: {
    back() {
      this.$emit("tabletBack");
    }
  },
  beforeMount() {
    if (this.activeConversationId != 0)
      $.ajax({
        type: "GET",
        url: "/en/api/room/" + this.advertId,
        success: response => {
          this.advert = response;
          this.activeImage = 0;
        }
      });
  }
};
</script>

<style scoped>
.advertTitle {
  font-size: 22px;
  font-weight: bold;
}
.prevImage,
.nextImage {
  border: 1px solid lightgray;
  width: 45%;
  margin-left: 3%;
  padding: 10px;
  float: left;
}
.tablet-back {
  width: 32px;
  position: absolute;
  left: 10px;
}
.tablet-back img {
  width: 32px;
}
.advert-information {
  text-align: left;
}
</style>