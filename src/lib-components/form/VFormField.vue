<template>
  <v-list-item class="container-box" style="width: 100%">
    <v-flex class="container-content form-field">
      <v-icon
          size="30"
          class="mr-5 handle"
      >
        {{ icon }}
      </v-icon>
      <template v-if="value.fieldType === 'const'">
        <span class="flex-grow-1">{{ fieldKey }}</span>
        <span class="flex-grow-0 text-right mr-10">{{ value.fieldType }}</span>
      </template>
      <template v-else>
        <span class="flex-grow-1">{{ value.title }}</span>
        <span class="flex-grow-0 text-right mr-10">{{ value.fieldType }}</span>
      </template>

      <v-menu
          top
          offset-x
      >
        <template #activator="{ on, attrs }">
          <v-btn
              icon
              v-bind="attrs"
              v-on.prevent="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-edit-form-field-modal
              :value="value"
              :field-key="fieldKey"
              :schemas="settings.formFieldSchemas"
              :generic-schema="settings.defaultFormFieldSchema"
              @saved="onFieldChanged"
          />

          <v-list-item
              v-if="value.fieldType !== 'const'"
              link
              @click="fieldRemoved"
          >
            <v-list-item-title>Remove</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-flex>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {FormField,} from "@/types/Form";
import VEditFormFieldModal from "@/lib-components/modal/VEditFormFieldModal.vue";
import {FormBuilderSettings} from "@/types/Settings";

@Component({
  components: {VEditFormFieldModal}
})
export default class VFormField extends Vue {

  @Prop()
  value!: FormField;

  @Prop()
  fieldKey!: string;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(field: any): any {
    return {
      key: this.fieldKey,
      newKey: field.key,
      value: field
    };
  }

  get icon(): string {
    return this.settings.iconSettings.iconMap[this.value.fieldType] ?? this.settings.iconSettings.defaultIcon;
  }

  onFieldChanged(field: any): void {
    this.input(field);
  }

  @Emit("remove")
  fieldRemoved(): string {
    return this.fieldKey;
  }
}
</script>

<style>

.form-field:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

</style>
