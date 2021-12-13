<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <p>Call a friend, Call Socialgram</p>
      </div>
      <div id="mentions">
        <p>2021 | guilan university project</p>
      </div>
    </div>
    <div id="comments">
      <p>We are happy to have you in our network</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFooter"
}
</script>

<style scoped>
#container {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  color: white;
  background-color: #201a4b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

#contacts--contact {
  text-align: right;
}

#contacts--social div {
  height: 30px;
  width: 30px;
  background-color: white;
  border-radius: 50%;
}

#mentions p {
  font-size: 1em;
}

@media only screen and (max-width: 450px) {
  #contacts {
    display: flex;
    flex-direction: column;
  }
  #comments p{
    text-align: center;

  }
}
</style>
