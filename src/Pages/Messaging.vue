<template>
  <div>
    <div class="container" :style="containerStyle">
      <conversations
        v-show="showList"
        class="conversationsPanel"
        :style="listStyle"
        :currentUserId.sync="currentUserId"
        :activeConversationId="activeConversationId"
        @update:activeConversation="updateActiveConversation"
        @activeConversation="updateActiveConversation"
      />
      <keep-alive>
        <chat
          v-show="showChat"
          class="chatPanel"
          ref="chatPanel"
          :activeConversationId="activeConversationId"
          :currentUserId="currentUserId"
          :key="activeConversationId+'_chat'"
          :conversation="activeConversation"
          :style="chatStyle"
          :isMobile="isMobile"
          :isTablet="isTablet"
          @mobileBack="mobileBack"
          @showAdvert="updateShowAdvert"
        />
      </keep-alive>
      <keep-alive>
        <advert
          v-show="(!isMobile&&!isTablet)||showAdvert"
          class="advertPanel"
          :key="activeConversationId+'_advert'"
          :activeConversationId="activeConversationId"
          :style="advertStyle"
          :advertId="activeAdvertId"
          :isTablet="isTablet"
          @tabletBack="tabletBack"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Conversations from "@Components/Messaging/Conversations/ConversationsList.vue";
import Chat from "@Components/Messaging/Chat/Chat.vue";
import Advert from "@Components/Messaging/Advert/Advert.vue";
export default {
  name: "RouterWrapper",
  components: {
    Conversations,
    Chat,
    Advert
  },
  data() {
    return {
      activeConversationId: 0,
      activeConversation: {},
      activeAdvertId: 0,
      isMobile: false,
      isTablet: false,
      showList: true,
      showChat: true,
      showAdvert: true,
      window: {
        width: 0,
        height: 0
      },
      chatStyle: {
        width: " calc(100% - 322px)"
      },
      listStyle: {
        width: "320px"
      },
      advertStyle: {
        width: "320px"
      },
      containerStyle: {
        background: "#FFF",
        padding: 0,
        width: "100% !important",
        overflow:"hidden"
      },
      currentUserId: 0
    };
  },
  watch: {
    window: {
      deep: true,
      immediate: true,
      handler(window) {
        this.chatStyle.width = " calc(100% - 645px)";
        this.listStyle.width = "320px";
        this.advertStyle.width = "320px";

        if (window.width < 1280) {
          this.chatStyle.width = " calc(100% - 323px)";
          this.advertStyle.width = this.chatStyle.width;
          this.isTablet = true;
          this.showAdvert = false;
        } else {
          this.isTablet = false;
          this.showAdvert = true;
        }
        if (window.width < 768) {
          this.isMobile = true;
          this.chatStyle.width = "100%";
          this.listStyle.width = "100%";
          this.advertStyle.width = "100%";
          this.showChat = false;
        } else {
          this.isMobile = false;
          this.showChat = true;
        }

        if (window.width > 1280) {
          this.showChat = true;
        }
        this.containerStyle.height = window.height - 300 + "px";
      }
    },
    activeConversationId: {
      immediate: true,
      handler(id) {
        if (this.isMobile && id != 0) {
          this.showChat = true;
          this.showList = false;
        }
        if (this.isMobile && id == 0) {
          this.showList = true;
          this.showChat = false;
        }

        if(this.isTablet){
          this.showAdvert=false;
          this.showChat=true;
        }
      }
    }
  },
  methods: {
    mobileBack() {
      this.activeConversationId = 0;
      this.showChat = false;
      this.showList = true;
    },
    updateShowAdvert() {
      this.showAdvert = true;
      this.showChat = false;
    },
    tabletBack() {
      this.showAdvert = false;
      this.showChat = true;
    },
    updateActiveConversation(data) {
      this.activeConversationId = data.ConversationId;
      this.activeConversation = data;
      this.activeAdvertId = data.RoomAdvertId;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  position: relative;
}
.conversationsPanel {
  width: 320px;
  float: left;
  position: relative;
  border-right: 1px solid lightgray;
  height: 100%;
}
.chatPanel {
  float: left;
  height: 100%;
  border-right: 1px solid lightgray;
}
.advertPanel {
  padding: 10px;
  float: left;
  height: 100%;
  position: relative;
}
</style>