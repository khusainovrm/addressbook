<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localazeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select"
            v-model="current"
          >
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{'Select a category' | localazeFilter }}</label>
        </div>


        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"

          >
          <label for="name">{{'Name' | localazeFilter }}</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >{{'Enter a name' | localazeFilter }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.title.minValue}"
          >
          <label for="limit">{{'Limit' | localazeFilter }}</label>
          <span class="helper-text invalid"
                v-if="$v.limit.$dirty && !$v.title.minValue"
          >{{'Minimum value' | localazeFilter }} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update' | localazeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css"
import {minValue, required} from "vuelidate/lib/validators";

export default {
    name: "CategoryEdit",
    data: () => ({
      title: "",
      limit: 100,
      select: null,
      current: null
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(100)}
    },
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const category = await this.$store.dispatch("updateCategory", {title: this.title, limit: this.limit, id:this.current})
        this.$emit("updateCategory", {title: this.title, limit: this.limit, id:this.current})
        this.$message("Категория была успешно обновлена")
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }
  },
    watch: {
      current(cId) {
        const {title, limit} = this.categories.find(key => key.id=== cId)
        this.title = title
        this.limit = limit

      }
    },
  created() {
    const {id, title, limit} = this.categories[0]

    this.current = id
    this.title = title
    this.limit = limit

  },
  mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
    this.select = M.updateTextFields()
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
