
<script setup>
import axios from 'axios'
axios.post('/api/users')
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
</script>
<template>
  <section>
    <g-markdown file="./haha.md" />
  </section>
</template>
