<template>
  <div>
    <filter-panel />
    <div class="conversationsInner">
      <div
        v-on:click="openConversation(conversation)"
        v-for="conversation in conversations"
        :key="conversation.ConversationId"
      >
        <conversation-tile
          :conversation="conversation"
          class="conversation-tile"
          :key="conversation.ConversationId"
          :class="conversation.ConversationId===activeConversationId?'active':''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterPanel from "./FilterPanel.vue";
import ConversationTile from "./ConversationTile.vue";
export default {
  name:"ConversationsList",
  props: {
    activeConversationId: {
      type: Number,
      default: 0
    },
    currentUser: {
      type: Number,
      default: 0
    }
  },
  components: {
    ConversationTile,
    FilterPanel
  },
  beforeMount() {
    $.ajax({
      type: "GET",
      url: "/en/api/messages/",
      success: response => {
        this.conversations = response.ConversationsWithLastMessage;
        this.$emit("update:currentUserId", response.CurrentUser.UserId);
      }
    });
  },
  methods: {
    openConversation(conversation) {
      this.$emit("update:activeConversation", conversation);
    }
  },
  data() {
    return {
      conversations: []
    };
  }
};
</script>

<style>
.active {
  background-color: #f6fff6;
}
.conversation-tile {
  display: block;
  position: relative;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  height: 80px;
}
.conversation-tile:hover {
  background-color: #f6fff6;
}
.conversationsInner {
  height: calc(100% - 70px);
  overflow: auto;
  overflow-x: hidden;
}
</style>