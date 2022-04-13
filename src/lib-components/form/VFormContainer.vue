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

      <VPropertiesContainer @input="propertiesChanged" :dragOptions="dragOptions" :properties="properties"/>
    </v-list-group>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {FormFieldContainer} from "@/types/Form";
import {FormBuilderSettings} from "@/types/Settings";
import VEditContainerModal from "@/lib-components/modal/VEditContainerModal.vue";

@Component({
  components: {VEditContainerModal}
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
