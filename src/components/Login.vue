<script setup>
import { ref } from "vue";
import login from "../assets/card.png";
import axios from "axios";
let initialVal = {
  username: "",
  password: "",
};
let form = ref({ ...initialVal });
let errors = ref({ ...initialVal });

let success = "";
// submitform
async function submitform(e) {
  errors.value = { ...initialVal };
  // getting Form data
  console.log(form);
  console.log(errors);
  // submitting form data
  if (!form.value.username) {
    errors.value.username = "please enter username";
    return;
  }
  if (!form.value.password) {
    errors.value.password = "please enter password";
    return;
  } else if (form.value.password.length < 8) {
    errors.value.password = "password length must be 8 letters";
  }
  try {
    let res = await axios.post("http://localhost:8080/api/login", form.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    alert(`welcome ${form.value.username}`);
    form.value = { ...initialVal };
  } catch (err) {
    console.log(err.response.data);
    errors.value.password = err.response.data;
  }
}
defineProps({
  login: login,
});
</script>

<template>
  <div class="login-wrapper container">
    <div class="row">
      <div class="col-md-12 col-12">
        <div class="card d-flex flex-md-row p-3 gap-4 align-items-stretch">
          <div class="card-image col-md col-12">
            <img :src="login" alt="login image" class="w-100" />
          </div>
          <div
            class="card-content col-md col-12 d-flex flex-column justify-content-center"
          >
            <div class="col-md-8 col-12 mx-auto text-center">
              <div class="head mb-4">
                <h1 class="mb-0 fw-bold">Welcome</h1>
                <p>We are glad to see you back with us</p>
              </div>
              <div class="success" v-if="success">{{ success }}</div>
              <form action="/" @submit.prevent="submitform">
                <div class="mb-3">
                  <div class="mb-4 position-relative">
                    <span class="input-group-text"
                      ><i class="fa-solid fa-user"></i
                    ></span>
                    <input
                      type="text"
                      name="username"
                      class="form-control"
                      placeholder="Username"
                      v-model="form.username"
                    />
                    <div
                      v-if="errors.username"
                      class="text-danger position-absolute bottom-1 left-0"
                    >
                      {{ errors.username }}
                    </div>
                  </div>

                  <div class="mb-4 position-relative">
                    <span class="input-group-text"
                      ><i class="fa-solid fa-lock"></i
                    ></span>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="form.password"
                    />
                    <div
                      v-if="errors.password"
                      class="text-danger position-absolute bottom-1 left-0"
                    >
                      {{ errors.password }}
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-dark w-100 py-2">Sign in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
