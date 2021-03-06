<template>
  <div
      class="d-flex h-100">
    <VFormBuilderElements
      :settings="builderSettings.modelerPalette"
      :iconSettings="builderSettings.iconSettings"/>
    <v-card
        elevation="1"
        class="contentWrapper modeler-area">
      <v-card-title class="pt-1">{{ name }}</v-card-title>

      <v-card-subtitle>{{ description }}</v-card-subtitle>

      <v-list class="h-100">
        <draggable
            :list="value.allOf"
            class="list-group"
            style="margin-bottom: 50px"
            handle=".handle"
            v-bind="dragOptions"
            @change="onListChanged"
            @start="drag = true"
            @end="drag = false"
        >
          <v-form-section
              v-for="section in value.allOf"
              :key="uuid(section)"
              class="w-100"
              :value="section"
              @remove="onSectionRemoved"
              @input="onSectionChanged"
          />
        </draggable>
      </v-list>
    </v-card>
  </div>
</template>

<style>

.container-header > div:first-child {
  padding: 0 !important;
  margin: 0;
}

.contentWrapper {
  padding: 20px;
  border-radius: 10px !important;
  background-color: white;
}

.container-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
}

.container-box {
  padding-right: 0;
}

.container-header {
  flex-grow: 1;
}

.container-header > div:first-child {
  padding: 0 !important;
  margin: 0;
}

.handle {
  cursor: grab;
}

.field-placeholder {
  min-height: 60px;
  margin-left: 40px;
  align-items: center;
  display: flex;
}

</style>

<style scoped>

.modeler-area {
  max-width: 1000px;
  min-height: 908px;
  margin-bottom: 8px;
  margin-left: 40px;
  flex-grow: 1;
  height: 100%;
}

</style>

<script lang="ts">
import {Component, Emit, Prop, Provide, Vue} from 'vue-property-decorator';
import {Form, Section} from "@/types/Form";
import VFormSection from "@/lib-components/form/VFormSection.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import {FormBuilderSettings} from "@/types/Settings";
import VFormBuilderElements from "@/lib-components/form/VFormBuilderElements.vue";

@Component({
  components: {VFormBuilderElements, VFormSection}
})
export default class VFormBuilder extends Vue {

  drag = false;
  dragOptions = {
    animation: 200,
    group: "section",
    disabled: false,
    ghostClass: "ghost"
  }

  @Prop()
  value!: Form;

  @Prop()
  name!: string;

  @Prop()
  description!: string;

  @Prop()
  @Provide("builderSettings")
  builderSettings!: FormBuilderSettings;

  @Emit("input")
  input(): any {
    return this.value;
  }

  onListChanged(): void {
    this.input();
  }

  uuid(section: Section): string {
    if (section.key) return section.key;
    const key = generateUUID();
    this.$set(section, "key", key);
    this.input();
    return section.key;
  }

  onSectionChanged(section: Section): any {
    for (let i = 0; i < this.value.allOf.length; i++) {
      if (this.value.allOf[i].key === section.key) {
        Vue.set(this.value.allOf, i, section);
        this.input();
        break;
      }
    }
  }

  onSectionRemoved(key: string): any {
    this.value.allOf = this.value.allOf.filter((el: Section) => el.key != key);
    this.input();
  }

}
</script>
