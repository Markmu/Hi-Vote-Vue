<template>
  <div>
    <a-row type="flex" justify="space-around" align="middle">
      <div v-for="item in category" :key="item.order">
        <a-col
          class="item"
          :span="4"
          @click="chooseToCreate(item.order, item.clickable)"
          ><div>
            <a-icon
              :type="item.icon"
              :style="{ fontSize: 2.4 + 'rem' }"
            ></a-icon
            ><br />
            {{ item.name }}
          </div></a-col
        >
      </div>
    </a-row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      category: [
        {
          order: 1,
          name: "创建投票",
          icon: "inbox",
          path: "/vote/theme",
          clickable: true
        },
        {
          order: 2,
          name: "敬请期待",
          icon: "plus",
          clickable: false
        }
      ]
    };
  },
  methods: {
    chooseToCreate(order, clickable) {
      console.log("order: " + order + "\nclicable: " + clickable);
      if (!clickable) {
        return;
      }
      if (order === 1) {
        this.$router.push({ path: "/vote/theme" });
      }
    }
  }
};
</script>

<style scoped>
.item {
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-color: aliceblue;
  text-align: center;
  margin: 0.6rem;
}
</style>
