<template>
  <div>
    <div style="height:100%" v-if="activeConversationId!=0">
      <div class="topbar" @click="showAdvert">
        <div v-if="isMobile" class="mobile-back" @click="back">
          <img
            src="https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_97-512.png"
          />
        </div>
        <div class="user-info">
          <img :src="conversation.OtherParticipantProfilePhotoUrl" />
          <div class="user-text">
            <span class="user-name">{{conversation.OtherParticipantCompleteName}}</span>
            <br />
            <span class="user-advert">
              {{conversation.RoomDetails}}
            </span>
          </div>
        </div>
        <div class="clearfix" />
      </div>

      <div class="messageBox" @scroll="updateScrollPos">
        <div v-for="message in messages" :key="message.id">
          <div class="message-wrapper">
            <img
              :src="message.img"
              style="margin:0;"
              :class="message.received?'img-left':'img-right'"
            />
            <span class="message" :class="message.received?'received':'sent'">{{message.text}}</span>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>

      <div class="input">
        <input
          type="textbox"
          v-model="userInput"
          @keyup.enter="sendMessage"
          @input="validateInput"
          :class="{'error':messageError}"
        />
        <div class="rent" :style="button" @click="sendMessage">rent request</div>
        <div class="attach" :style="button">attach a file</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatPanel",
  props: {
    activeConversationId: {
      type: Number,
      default: 0
    },
    conversation: {
      type: Object
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    isTablet: {
      type: Boolean,
      default: false
    },
    currentUserId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      userInput: "",
      messageCount: 100,
      messages: [],
      scrollPos: 0,
      button: {
        width: "150px"
      },
      loading: true,
      messageError: false
    };
  },
  methods: {
    loadMessages() {
      if (this.loading) {
        let height = this.$el.querySelector(".messageBox").scrollHeight;
        this.messages = [...this.messages, ...this.messages];
        this.loading = false;
        this.$nextTick(() => {
          this.$el.querySelector(".messageBox").scrollTop = height;
        });
      }
    },
    updateScrollPos() {
      this.scrollPos = this.$el.querySelector(".messageBox").scrollTop;
      if (this.scrollPos === 0) {
        this.loading = true;
        this.loadMessages();
      }
    },
    back() {
      this.$emit("mobileBack");
    },
    showAdvert() {
      if (this.isMobile || this.isTablet) {
        this.$emit("showAdvert");
      }
    },
    validateInput() {
      if (this.userInput.length > 3) {
        this.messageError = false;
      }
    },
    sendMessage() {
      if (this.userInput.length > 3) {
        this.messages.push({
          received: false,
          text: this.userInput,
          img: this.conversation.OtherParticipantProfilePhotoUrl,
          time: new Date().toLocaleString()
        });
        let retarded = this.userInput
          .split("")
          .map(c => {
            if (Math.random() < 0.5) {
              return c.toUpperCase();
            } else {
              return c;
            }
          })
          .join("");
        let f = () => {
          this.messages.push({
            received: true,
            text: retarded,
            img: this.conversation.OtherParticipantProfilePhotoUrl,
            time: new Date().toLocaleString()
          });
        };
        setTimeout(f, 555);
        this.userInput = "";
        this.messageError = false;
      } else {
        this.messageError = true;
      }
    }
  },
  beforeMount() {
    if (this.activeConversationId != 0)
      $.ajax({
        type: "GET",
        url: "/en/api/messages/chat/" + this.activeConversationId,
        success: response => {
          let messages = response.map(m => {
            return {
              received: m.MessageParticipantUserId !== this.currentUserId,
              text: m.MessageText,
              img: m.OtherParticipantProfilePhotoUrl,
              time: m.MessageSendDateFormatted
            };
          });
          this.messages = messages;
          this.loading = false;
        }
      });
  },
  mounted() {
    window.onbeforeunload = () => {
      if (this.userInput.length > 0) {
        return "Are you sure you want to leave this message?";
      } else {
        return;
      }
    };
    if (this.isMobile) {
      this.button.width = "calc(50% - 22px)";
    }
  },
  activated() {
    let el = this.$el.querySelector(".messageBox");
    if (el) el.scrollTop = this.scrollPos;
  },
  updated() {
    let el = this.$el.querySelector(".messageBox");
    el.scrollTop = el.scrollHeight;
  }
};
</script>

<style scoped src="./Chat.scss"></style>