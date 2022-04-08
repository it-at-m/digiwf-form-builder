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
                  :schemas="settings.formFieldSchemas"
                  :generic-schema="settings.defaultFormFieldSchema"
                  :field-key="fieldKey"
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

      <draggable
          :list="properties"
          class="list-group pl-10"
          handle=".handle"
          :empty-insert-threshold="500"
          v-bind="dragOptions"
          @change="onDragChanged"
          @start="drag = true"
          @end="drag = false"
      >
        <template v-for="property in properties">
          <v-form-field
              v-if="!isObjectType(property) && !isArrayObjectType(property)"
              :key="property[0]"
              :field-key="property[0]"
              :value="property[1]"
              @input="onFormFieldChanged"
              @remove="onFieldRemoved"
          />
          <v-form-object
              :key="property[0]"
              v-else-if="isObjectType(property)"
              :field-key="property[0]"
              :value="property[1]"
              @input="onFormFieldChanged"
              @remove="onFieldRemoved"
          />

          <v-form-array-object
              :key="property[0]"
              v-else-if="isArrayObjectType(property)"
              :field-key="property[0]"
              :value="property[1]"
              @input="onFormFieldChanged"
              @remove="onFieldRemoved"
          />
        </template>

        <div
            v-if="properties.length < 1"

            slot="header"
            role="group"
            class="field-placeholder pl-10"
        >
          insert field
        </div>
      </draggable>
    </v-list-group>
  </v-list-item>
</template>


<style>
.container-header > div:first-child {
  padding: 0 !important;
  margin: 0;
}

</style>

<style scoped>

.handle {
  cursor: grab;
}

.field-placeholder {
  min-height: 60px;
  align-items: center;
  display: flex;
}

.container-header {
  flex-grow: 1;
}

.container-box {
  flex-grow: 1;
  padding: 0 !important;
}

.container-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 27px 12px 51px;
}

</style>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {FormField} from "@/types/Form";
import VFormField from "@/lib-components/form/VFormField.vue";
import VEditContainerModal from "@/lib-components/modal/VEditContainerModal.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import VEditFormFieldModal from "@/lib-components/modal/VEditFormFieldModal.vue";
import {FormBuilderSettings} from "@/types/Settings";
import VFormObject from "@/lib-components/form/VFormObject.vue";

@Component({
  components: {
    VEditFormFieldModal,
    VEditContainerModal,
    VFormField,
    VFormObject
  }
})
export default class VFormArrayObject extends Vue {

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
    return Object.entries(this.value.items.properties!);
  }

  icon(): string {
    return this.settings.iconSettings.iconMap[this.value.fieldType] ?? this.settings.iconSettings.defaultIcon;
  }

  isObjectType(field: any): boolean {
    return field[1].fieldType === 'object';
  }

  isArrayObjectType(field: any): boolean {
    return field[1].fieldType === 'arrayObject' &&
        field[1].items && field[1].items.type === 'object';
  }

  onDragChanged(event: any): void {
    if (event && event.added && event.added.element[0].length !== 36) {
      event.added.element[0] = generateUUID();
    }

    const props: any = {};
    this.properties.forEach((property: any) => props[property[0]] = property[1]);
    this.input(
        {
          key: this.fieldKey,
          ...this.value,
          items: {
            type: "object",
            properties: props
          }
        }
    );
  }

  onObjectChanged(container: any): void {
    this.input(
        {
          key: this.fieldKey,
          ...container,
          items: {
            type: "object",
            properties: this.value.items.properties
          }
        }
    );
  }

  onFieldRemoved(key: string): any {
    const relevantFields = this.properties.filter((el: any) => el[0] != key);
    const props: any = {};
    relevantFields.forEach((property: any) => props[property[0]] = property[1]);
    this.input(
        {
          key: this.fieldKey,
          ...this.value,
          items: {
            type: "object",
            properties: props
          }
        }
    );
  }

  onFormFieldChanged(update: any) {
    const props: any = {};
    for (let i = 0; i < this.properties.length; i++) {
      const property = this.properties[i];
      if (property[0] === update.key) {
        props[update.newKey] = update.value;
      } else {
        props[property[0]] = property[1];
      }
    }
    this.input(
        {
          key: this.fieldKey,
          ...this.value,
          items: {
            type: "object",
            properties: props
          }
        }
    );
  }
}
</script>
