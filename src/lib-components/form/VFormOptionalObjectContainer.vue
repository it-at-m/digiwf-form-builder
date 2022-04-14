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
            mdi-border-none-variant
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
              <v-edit-section-modal
                  :value="value"
                  :schema="settings.conditionalContainerSchema"
                  @saved="onContainerChanged"
              />
              <v-list-item
                  link
                  @click="removed"
              >
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
      </template>

      <draggable
          :list="value.oneOf"
          class="list-group"
          handle=".handle"
          v-bind="dragOptions"
          @change="onListChanged"
          @start="drag = true"
          @end="drag = false"
      >
        <v-form-optional-item
            v-for="optItem in value.oneOf"
            :key="uuid(optItem)"
            :value="optItem"
            :default="value.default"
            @defaultChanged="defaultChanged"
            @input="onItemChanged"
            @remove="onItemRemoved"
        />
        <div
            v-if="value.oneOf < 1"
            slot="header"
            role="group"
            class="field-placeholder"
        >
          insert Item
        </div>
      </draggable>
    </v-list-group>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import VEditSectionModal from "@/lib-components/modal/VEditSectionModal.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import {FormBuilderSettings} from "@/types/Settings";
import VFormOptionalItem from "@/lib-components/form/VFormOptionalItem.vue";

@Component({
  components: {VFormOptionalItem, VEditSectionModal}
})
export default class VFormOptionalObjectContainer extends Vue {

  dragOptions = {
    animation: 200,
    group: "optionalItem",
    disabled: false
  }

  @Prop()
  fieldKey!: string;

  @Prop()
  value!: any;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(value: any): any {
    return {
      key: this.fieldKey,
      newKey: value.key,
      value: value
    };
  }

  @Emit("remove")
  removed(): string {
    return this.fieldKey;
  }

  onListChanged(): void {
    this.input(this.value);
  }

  uuid(container: any): string {
    if (container.key) return container.key;
    const key = generateUUID();
    this.$set(container, "key", key);
    this.input(this.value);
    return container.key;
  }

  defaultChanged(value: any): void {
    const defaultValue: any = {}
    defaultValue[value[0]] = value[1].const;
    const newContainer = {
      key: this.fieldKey,
      ...this.value,
      "default": defaultValue
    };
    this.input(newContainer);
  }

  onItemChanged(container: any): void {
    for (let i = 0; i < this.value.oneOf.length; i++) {
      if (this.value.oneOf[i].key === container.key) {
        Vue.set(this.value.oneOf, i, container);
        this.input({
          key: this.fieldKey,
          ...this.value
        });
        return;
      }
    }
  }

  onContainerChanged(section: any): void {
    const newContainer = {
      key: this.fieldKey,
      ...section,
      oneOf: this.value.oneOf
    };
    this.input(newContainer);
  }

  onItemRemoved(key: string): any {
    this.value.oneOf = this.value.oneOf.filter((el: any) => el.key != key);
    this.input({
      key: this.fieldKey,
      ...this.value
    });
  }

}
</script>


