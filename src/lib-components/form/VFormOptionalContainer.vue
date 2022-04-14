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
          :list="value.allOf"
          class="list-group"
          handle=".handle"
          v-bind="dragOptions"
          @change="onListChanged"
          @start="drag = true"
          @end="drag = false"
      >
        <v-form-optional-fields-container
            v-for="optItem in value.allOf"
            :key="uuid(optItem)"
            :value="optItem"
            @input="onItemChanged"
            @remove="onItemRemoved"
        />
        <div
            v-if="value.allOf < 1"
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
import {Section} from "@/types/Form";
import VEditSectionModal from "@/lib-components/modal/VEditSectionModal.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import {FormBuilderSettings} from "@/types/Settings";
import VFormOptionalFieldsContainer from "@/lib-components/form/VFormOptionalFieldsContainer.vue";

@Component({
  components: {VFormOptionalFieldsContainer, VEditSectionModal}
})
export default class VFormOptionalContainer extends Vue {

  dragOptions = {
    animation: 200,
    group: "optionalContainer",
    disabled: false
  }

  @Prop()
  value!: any;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(value: any): any {
    return value;
  }

  @Emit("remove")
  removed(): string {
    return this.value.key;
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

  onContainerChanged(section: Section): void {
    const newContainer = {
      ...section,
      allOf: this.value.allOf
    };
    this.input(newContainer);
  }

  onItemRemoved(key: string): any {
    this.value.allOf = this.value.allOf.filter((el: any) => el.key != key);
    this.input(this.value);
  }

  onItemChanged(container: any): void {
    for (let i = 0; i < this.value.allOf.length; i++) {
      if (this.value.allOf[i].key === container.key) {
        Vue.set(this.value.allOf, i, container);
        this.input(this.value);
        return;
      }
    }
  }

}
</script>


