<template>
  <draggable
      :list="properties"
      class="list-group"
      handle=".handle"
      :empty-insert-threshold="500"
      v-bind="dragOptions"
      @change="onDragChanged"
      @start="drag = true"
      @end="drag = false"
  >
    <template v-for="property in properties">
      <v-form-field
          v-if="!isObjectType(property) && !isArrayObjectType(property) && !isOptionalContainer(property)"
          :key="property[0]"
          :field-key="property[0]"
          :value="property[1]"
          @input="onFormFieldChanged"
          @remove="onFieldRemoved"
      />
      <v-form-optional-container
          :key="property[0]"
          v-else-if="isOptionalContainer(property)"
          :field-key="property[0]"
          :value="property[1]"
          @input="onFormFieldChanged"
          @remove="onFieldRemoved">
      </v-form-optional-container>

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
        class="field-placeholder"
    >
      insert field
    </div>
  </draggable>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {generateUUID} from "@/utils/UUIDGenerator";
import VFormField from "@/lib-components/form/VFormField.vue";
import VEditContainerModal from "@/lib-components/modal/VEditContainerModal.vue";
import VFormOptionalContainer from "@/lib-components/form/VFormOptionalContainer.vue";

@Component({
  components: {VFormOptionalContainer, VEditContainerModal, VFormField}
})
export default class VPropertiesContainer extends Vue {

  @Prop()
  properties: any;

  @Prop()
  dragOptions: any;

  @Emit("input")
  input(value: any): any {
    return value;
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
    this.input(props);
  }

  uuid(optionalContainer: any): string {
    if (optionalContainer.key) return optionalContainer.key;
    const key = generateUUID();
    this.$set(optionalContainer, "key", key);
    this.input(this.properties);
    return optionalContainer.key;
  }

  onFieldRemoved(key: string): any {
    const relevantFields = this.properties.filter((el: any) => el[0] != key);
    const props: any = {};
    relevantFields.forEach((property: any) => props[property[0]] = property[1]);
    this.input(props);
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
    this.input(props);
  }

}
</script>
