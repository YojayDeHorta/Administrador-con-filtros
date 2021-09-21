<template>
    <div class="Tabs">
        <ul class="nav nav-pills mb-3 d-flex justify-center mt-5" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Login</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sign Up</button>
            </li>
        </ul>
        <div class="tab-content d-flex justify-center" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"><Login></Login></div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"><Sign></Sign></div>
         
        </div>
    </div>
</template>
<script>
import Login from '../components/Login.vue';
	import Sign from '../components/Registro.vue';
export default {
	name:'Tabs',
	components:{
		Login,Sign
	}
}
</script>
<style scoped>
.Tabs{
	border:5px solid red;
	margin:auto;
}
.nav li{
		margin-left: 25px;
	}
</style>