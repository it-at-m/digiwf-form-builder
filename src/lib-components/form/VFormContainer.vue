<template>
  <v-list-item
      class="container-box pb-4"
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
            mdi-crop-free
          </v-icon>
          <span class="font-weight-bold">{{ value.title }}</span>
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
              <v-edit-container-modal
                  :value="value"
                  :schema="settings.containerSchema"
                  @saved="onContainerChanged"
              />
              <v-list-item
                  link
                  @click="containerRemoved"
              >
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
      </template>

      <v-container
    </v-list-group>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {FormFieldContainer} from "@/types/Form";
import VFormField from "@/lib-components/form/VFormField.vue";
import VEditContainerModal from "@/lib-components/modal/VEditContainerModal.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import {FormBuilderSettings} from "@/types/Settings";
import VFormOptionalContainer from "@/lib-components/form/VFormOptionalContainer.vue";

@Component({
  components: {VFormOptionalContainer, VEditContainerModal, VFormField}
})
export default class VFormContainer extends Vue {

  dragOptions = {
    animation: 200,
    group: "field",
    disabled: false,
    ghostClass: "ghost"
  }

  @Prop()
  value!: FormFieldContainer;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(value: FormFieldContainer): any {
    return value;
  }

  @Emit("remove")
  containerRemoved(): string {
    return this.value.key;
  }

  get properties(): any[] {
    return Object.entries(this.value.properties);
  }

  isOptionalContainer(container: any): boolean {
    return container[1].fieldType === 'optionalContainer';
  }

  isObjectType(field: any): boolean {
    return field[1].fieldType === 'object';
  }

  isArrayObjectType(field: any): boolean {
    return field[1].fieldType === 'arrayObject' &&
        field[1].items && field[1].items.type === 'object';
  }

  onDragChanged(event: any): void {
    if (event && event.added) {
      event.added.element[0] = generateUUID();
    }
    const props: any = {};
    this.properties.forEach((property: any) => props[property[0]] = property[1]);
    this.input(
        {
          ...this.value,
          properties: props
        }
    );
  }

  onContainerChanged(container: any): void {
    this.input(
        {
          ...container,
          properties: this.value.properties
        }
    );
  }

  uuid(optionalContainer: any): string {
    if (optionalContainer.key) return optionalContainer.key;
    const key = generateUUID();
    this.$set(optionalContainer, "key", key);
    this.input(this.value);
    return optionalContainer.key;
  }

  onFieldRemoved(key: string): any {
    const relevantFields = this.properties.filter((el: any) => el[0] != key);
    const props: any = {};
    relevantFields.forEach((property: any) => props[property[0]] = property[1]);
    this.input(
        {
          ...this.value,
          properties: props
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
    this.value.properties = props;
    this.input(
        {
          ...this.value,
          properties: props
        }
    );
  }
}
</script>
