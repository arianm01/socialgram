<template>
  <div id="autocomplete" class="autocomplete">
    <input type="text" name="search" aria-label="Search" v-model="search" placeholder="Search..">
    <ul class="autocomplete-result-list"></ul>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searcher() {
      this.$axios.$get(process.env.baseURL+'search/'+this.search+'?page=0',{
        headers: {
          'Authorization' : 'Bearer ' + this.$store.getters.token
        }
      }).then(response => {
        console.log(response);
      });
    }
  },
  watch:{
    search(){
      if(this.search.length > 2){
        this.searcher();
      }
    }
  }
};
</script>

<style scoped>
input[type=text] {
  width: 250px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url('../../assets/pics/img.png');
  background-position: 75px 5px;
  background-repeat: no-repeat;
  padding: 5px 20px 5px 100px;
}

input[type=text]:focus {
  outline: none;
  padding: 5px 20px 5px 20px;
  background-image: none;
}

#autocomplete {
  max-width: 400px;
  margin: 0 auto;
}

.group {
  padding: 16px;
  text-transform: uppercase;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.06);
}

.username {
  font-size: 20px;
  margin-bottom: 8px;
}

.name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}

@media only screen and (max-width: 825px) {
  input[type=text] {
    font-size: 14px;
    width: 100px;
    padding: 5px 10px;
    background-image: none;
  }
  input[type=text]:focus {
    padding: 5px 0;
  }
}
@media only screen and (max-width: 420px) {
  input[type=text] {
    width: 60px;
    font-size: 12px;
  }
}
</style>
