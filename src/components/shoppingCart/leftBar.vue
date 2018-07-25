<template>
<div>
    <div class="list-group sticky-top" >
        <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold"
        @click.prevent="setFilter('all')">
            <i class="fa fa-suitcase" aria-hidden="true"></i> 全部
        </a>
        <a class="list-group-item list-group-item-action" v-for="item in categories" :key="item.id" data-toggle="list" 
          :href="`#${item}`" @click.prevent="setFilter(item)">
          <i class="fa fa-suitcase" aria-hidden="true"></i> {{item}}
        </a>
    </div>
    <!-- <div class="list-group sticky-top">
          <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold">
            <i class="fa fa-suitcase" aria-hidden="true"></i> 金牌專賣店</a>
          <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
            <i class="fa fa-gift" aria-hidden="true"></i> 禮品區</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-film" aria-hidden="true"></i> 影音商品</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-paw" aria-hidden="true"></i> 寵物專用</a>
          <a href="#" class="list-group-item list-group-item-action disabled">
            <i class="fa fa-tree" aria-hidden="true"></i> 居家環境</a>
    </div> -->
 </div>
</template>



<script>

export default {
  props: ['categories'],
  data() {
    return {
      //products:{}
    };
  },
  methods: {
    setFilter(item){
      //console.log(item);
      this.$emit('emitSetFilter', item);
    }
  },
  components: {
   
  },
  created() {
    
  }
};
</script>