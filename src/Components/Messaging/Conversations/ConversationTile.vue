<template>
  <div>
    <img class="user-thumb" :src="conversation.RoomThumbnailImageUrl" />
    <div class="conversation-top">
      <span class="user-name">{{conversation.OtherParticipantCompleteName}}</span>
      <span class="conversation-time">{{conversation.MessageSendDateFormatted.split(' ')[1]}}</span>
    </div>
    <div class="conversation-middle">
      <span class="advertInfo">
        {{conversation.roomAddress}}
        <!-- <div v-if="false">
          {{conversation.advert.address}} - €{{conversation.advert.price}} - {{conversation.advert.size}}
          m
          <sup>2</sup>
        </div> -->
      </span>
      <br />
      <span class="conversation-message">{{conversation.MessageText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"ConversationTile",
  props: {
    conversation: {
      type: Object
    }
  }
};
</script>
<style scoped>
.advertInfo {
  font-weight: bold;
}
.conversation-top {
  float: right;
  width: 80%;
  font-weight: bold;
}
.conversation-middle {
  width: 80%;
  float: right;
  text-align: left;
  margin-top: 5px;
  font-size: 12px;
}
.conversation-message {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.conversation-time {
  float: right;
}
.user-thumb {
  float: left;
  width: 40px;
  margin: 2%;
}
.user-name {
  float: left;
}
</style>