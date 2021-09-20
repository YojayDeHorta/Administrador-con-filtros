<template>
  <v-app>
    <Navbar :adminVerification="adminVerification" @escuchar="cambioAdmin"></Navbar>
  <v-main>
    <!-- <Crud :adminVerification="adminVerification" ></Crud> -->
    
      <router-view/>
  </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Crud from './components/Crud';
export default {
  name: 'App',
  components: {
    Navbar,
    Crud
  },mounted() {
    this.adminLocal()
  },
  data: () => ({
    drawer:false,
    adminVerification:false
  }),
  methods: {
    cambioAdmin(value){
      console.log("valor del padre"+value);
      this.adminVerification=value;
      
    },
    adminLocal(){
      if (sessionStorage.getItem("Admin")!=null) {
          this.adminVerification=localStorage.getItem("Admin")
      }
    }
  }
};
</script>
