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
            mdi-border-none
          </v-icon>
          <span class="font-weight-bold">{{ value.title }}</span>
          <v-spacer/>
          <span v-if=" isDefault" class="font-weight-bold mr-10">default</span>
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
                  @click="removed"
              >
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
              <v-list-item
                  link
                  @click="defaultChanged"
              >
                <v-list-item-title>Default</v-list-item-title>
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
import VEditContainerModal from "@/lib-components/modal/VEditContainerModal.vue";
import {FormBuilderSettings} from "@/types/Settings";

@Component({
  components: {VEditContainerModal}
})
export default class VFormOptionalItem extends Vue {

  dragOptions = {
    animation: 200,
    group: "field",
    disabled: false,
    ghostClass: "ghost"
  }

  @Prop()
  value!: any;

  @Prop()
  default: any;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(value: any): any {
    return value;
  }

  @Emit("defaultChanged")
  defaultChanged(): any {
    return this.extractKey();
  }

  @Emit("remove")
  removed(): string {
    return this.value.key;
  }

  get properties(): any[] {
    return Object.entries(this.value.properties);
  }

  get isDefault(): boolean {
    if (!this.default) {
      return false;
    }
    return this.default && Object.entries(this.default)[0][1] === this.extractKey()[1].const;
  }

  extractKey(): any {
    return Object.entries(this.value.properties).filter((obj: any) => obj[1]['const'])[0];
  }

  onContainerChanged(container: any): void {
    this.input(
        {
          ...container,
          properties: this.value.properties
        }
    );
  }

  propertiesChanged(properties: any): void {
    this.input(
        {
          ...this.value,
          properties: properties
        }
    );
  }
}
</script>
