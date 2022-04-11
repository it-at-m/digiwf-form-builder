<template>
  <v-list-item
      class="container-box"
  >
    <v-list-group
        no-action
        sub-group
        prepend-icon=""
        class="container-header"
    >
      <template #activator>
        <v-flex class="container-content">
          <v-icon
              size="30"
              class="mr-5 handle"
          >
            {{ icon(value.fieldType) }}
          </v-icon>
          <span class="font-weight-regular">{{ value.title }}</span>
          <v-spacer/>
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
                  @saved="onObjectChanged"
              />
              <v-list-item
                  link
                  @click="fieldRemoved"
              >
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
      </template>

      <VPropertiesContainer @input="propertiesChanged" :dragOptions="dragOptions" :properties="properties"/>
    </v-list-group>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {FormField} from "@/types/Form";
import VEditFormFieldModal from "@/lib-components/modal/VEditFormFieldModal.vue";
import {FormBuilderSettings} from "@/types/Settings";

@Component({
  components: {VEditFormFieldModal}
})
export default class VFormObject extends Vue {

  dragOptions = {
    animation: 200,
    group: "field",
    disabled: false,
    ghostClass: "ghost"
  }

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Prop()
  fieldKey!: string;

  @Prop()
  value!: FormField;

  @Emit("input")
  input(value: any): any {
    return {
      key: this.fieldKey,
      newKey: value.key,
      value: value
    };
  }

  @Emit("remove")
  fieldRemoved(): string {
    return this.fieldKey;
  }

  get properties(): any[] {
    return Object.entries(this.value.properties!);
  }

  icon(): string {
    return this.settings.iconSettings.iconMap[this.value.fieldType] ?? this.settings.iconSettings.defaultIcon;
  }

  onObjectChanged(container: any): void {
    this.input(
        {
          key: this.fieldKey,
          ...container,
          properties: this.value.properties
        }
    );
  }

  propertiesChanged(properties: any): void {
    this.input(
        {
          key: this.fieldKey,
          ...this.value,
          properties: properties
        }
    );
  }

}
</script>
