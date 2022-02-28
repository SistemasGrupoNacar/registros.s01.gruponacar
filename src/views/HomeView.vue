<template>
  <div class="_big-container text-center px-4 py-3">
    <div class="_w-50">
      <p class="_bold">Registro de entrada y salida de personal</p>
      <div>
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
      </div>
      {{ accion }}
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { realizarAccionApi } from "@/api/index.js";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      credenciales: {
        action: null,
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async registrarAccion(datos) {
      if (!this.verificarDatos(datos)) {
        ElMessage.error({
          message: "Debe ingresar todos los datos",
        });
        return;
      }
      try {
        await realizarAccionApi(datos);
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
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al realizar la acción, intente nuevamente",
          });
        }
      }
      ElMessage.warning("Registrando acción...");
    },

    verificarDatos(datos) {
      if (
        datos.action == null ||
        datos.action != "Entrada" ||
        datos.action != "Salida" ||
        datos.username == null ||
        datos.password == null
      ) {
        return false;
      }
      return true;
    },
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
