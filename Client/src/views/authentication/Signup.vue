<script>
import * as yup from "yup";
import {useToast} from "vue-toastification";
import { Form, Field, ErrorMessage } from "vee-validate";

const toast = useToast();

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      phone: yup
        .string()
        .required("Phone is required!")
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number is not valid'),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      confirmpassword: yup
        .string()
        .required("Confirm Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!")
        .oneOf([yup.ref('password')], 'Passwords must match')
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$store.dispatch('notification/createNotification', {
        message:"Already signed in",
        type:"success"
      }).then(()=>{
        this.$router.push("/");
      });
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/signin");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            toast(error.response.data.message, {type:"error"});
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<template>
  <div id="form-wrapper">
    <div class="title">Signup</div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful" class="form-group">
        <label for="name">Name</label>
        <Field name="name" type="text" class="form-control" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="phone">Phone</label>
        <Field name="phone" type="text" class="form-control" />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="password">Password</label>
        <Field name="password" type="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="confirmpassword">Password confirm</label>
        <Field name="confirmpassword" type="password" class="form-control" />
        <ErrorMessage name="confirmpassword" class="error-feedback" />
      </div>

      <div v-if="!successful" class="form-group">
        <button class="button-52" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          Sign Up
        </button>
      </div>
    </Form>

    <!-- <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div> -->
  </div>
</template>

<style scoped>
#form-wrapper{
  background-color: #00000000;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 720px){
    &{
      flex-direction: column;
    }
  }
}
.title{
  width: 100px;
  margin-block: 30px;
  font-size: 32px;
  font-weight: bolder;
}
.form-group{
  width: 300px;
  margin: 6px 0;
  padding: 8px;
  background-color: var(--color-background-1);
  display: flex;
  flex-direction: column;
  border-radius: 8px ;
  -webkit-border-radius: 8px ;
  -moz-border-radius: 8px ;
  -ms-border-radius: 8px ;
  -o-border-radius: 8px ;
  &>label{
    font-weight:bold;
  }
  &>span[role=alert]{
    color: red;
  }
  &.form-message:empty{
    margin: 0;
    padding: 0;
  }
}
.form-group > input{
  width: 100%;
  background-color: transparent;
  transition: (transform, padding) .5s ease-in-out;
  font-size: 16px;
  line-height: 8px;
  color: #575756;
  background-color: transparent;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transition: (transform, padding) .5s ease-in-out;
  -moz-transition: (transform, padding) .5s ease-in-out;
  -ms-transition: (transform, padding) .5s ease-in-out;
  -o-transition: (transform, padding) .5s ease-in-out;
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #575756;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
}
.form-group > input::placeholder{
  content: "...";
  color: rgba(87, 87, 86, 0.8);
}

.button-52 {
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 20px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-52:after {
  content: "";
  background-color: #ffe54c;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.button-52:hover:after {
  top: 0px;
  left: 0px;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  margin-inline: 4px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  margin: 0px;
  border: 3px solid #000000;
  border-radius:50%;
  -webkit-border-radius:50%;
  -moz-border-radius:50%;
  -ms-border-radius:50%;
  -o-border-radius:50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


@media (min-width: 768px) {
  .button-52 {
    padding: 13px 50px 13px;
  }
}
</style>