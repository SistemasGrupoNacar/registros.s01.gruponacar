<template>
  <div class="_big-container text-center px-4 py-3">
    <div class="_w-50">
      <p class="_bold">Registro de entrada y salida de personal</p>
      <el-main v-loading.fullscreen.lock="cargando">
        <el-radio-group v-model="credenciales.action" class="d-block">
          <el-radio label="Entrada" size="large">Entrada</el-radio>
          <el-radio label="Salida" size="large">Salida</el-radio>
        </el-radio-group>
        <el-input
          v-model="credenciales.username"
          class="_w-50 d-block mx-auto my-4"
          size="large"
          placeholder="Ingrese su usuario"
          clearable
        />
        <el-input
          v-model="credenciales.password"
          class="_w-50 d-block mx-auto my-4"
          placeholder="Ingrese su contraseña"
          size="large"
          clearable
          type="password"
        />

        <el-button
          class="_w-50 p-4"
          v-on:click.prevent="registrarAccion(credenciales)"
          >Registrar acci&oacute;n</el-button
        >
      </el-main>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import registrarAccionApi from "@/api/index.js";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      cargando: false,
      credenciales: {
        action: null,
        username: null,
        password: null,
        date: null,
        coordinates: {
          lat: null,
          lng: null,
        },
      },
    };
  },
  methods: {
    async registrarAccion(datos) {
      this.cargando = true;
      if (!this.verificarDatos(datos)) {
        ElMessage.error({
          message: "Debe ingresar todos los datos",
        });
        this.cargando = false;
        return;
      }
      try {
        datos.date = new Date();
        await registrarAccionApi(datos);
        switch (datos.action) {
          case "Entrada":
            ElMessage.success({
              message: "Entrada registrada correctamente",
            });
            break;
          case "Salida":
            ElMessage.success({
              message: "Salida registrada correctamente",
            });
            break;
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error({
              message: "Datos enviados incompletos o incorrectos",
            });
            this.cargando = false;
            return;
          } else {
            ElMessage.error({
              message: error.response.data.message,
            });
            this.cargando = false;
            return;
          }
        } else {
          ElMessage.error({
            message: "Error al realizar la acción, intente nuevamente",
          });
        }
      }
      this.cargando = false;
    },

    verificarDatos(datos) {
      if (
        datos.action == null ||
        datos.username == null ||
        datos.password == null ||
        datos.coordinates.lat == null ||
        datos.coordinates.lng == null
      ) {
        return false;
      }
      return true;
    },
  },
  created() {
    this.$getLocation({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
      .then((coordinates) => {
        this.credenciales.coordinates.lat = coordinates.lat;
        this.credenciales.coordinates.lng = coordinates.lng;
      })
      .catch(() => {
        ElMessage.error({
          message: "Error al obtener las coordenadas",
        });
      });
  },
};
</script>
<style lang="scss">
._big-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
