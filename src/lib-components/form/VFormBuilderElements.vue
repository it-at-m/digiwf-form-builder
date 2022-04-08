<template>
  <v-card
      elevation="1"
      class="palette contentWrapper"
  >
    <h4 class="pl-5 pt-5">Sections</h4>
    <div class="field-divider"></div>
    <draggable
        :list="settings.modelerPalette.sections"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="secitonDragOptions"
    >
      <v-draggable-list-item
          v-for="section in settings.modelerPalette.sections"
          :key="section.title"
          class="pl-5"
          icon="mdi-tab"
          :name="section.title"
          :new-name="section.title"
          :new-description="section.description"
      />
    </draggable>

    <draggable
        :list="settings.modelerPalette.containers"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="containerDragOptions"
    >
      <v-draggable-list-item
          v-for="container in settings.modelerPalette.containers"
          :key="container.title"
          :icon="containerIcons(container.containerType)"
          class="pl-5"
          :name="container.title"
          :new-name="container.title"
          :new-description="container.description"
      />
    </draggable>

    <div style="margin-bottom: 20px"></div>
    <h4 class="pl-5">Objects</h4>
    <div class="field-divider"></div>
    <draggable
        v-for="field in settings.modelerPalette.objects"
        :key="field[1].title"
        :list="[field]"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="formObjectDragOtions"
    >
      <v-draggable-list-item
          :key="field[1].title"
          class="pl-5"
          :icon="icon(field[1].fieldType)"
          :name="field[1].title"
          :new-name="field[1].title"
          new-description=""
      />
    </draggable>

    <div style="margin-bottom: 20px"></div>
    <h4 class="pl-5">Optional Content</h4>
    <div class="field-divider"></div>
    <draggable
        v-for="optContent in settings.modelerPalette.optionalContent"
        :key="optContent[1].title"
        :list="[optContent]"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="conditionalContentContainerDragOptions"
    >
      <v-draggable-list-item
          :key="optContent[1].title"
          class="pl-5"
          :icon="icon(optContent[1].fieldType)"
          :name="optContent[1].title"
          :new-name="optContent[1].title"
          new-description=""
      />
    </draggable>
    <draggable
        v-for="optItem in settings.modelerPalette.optionalItem"
        :key="optItem.title"
        :list="[optItem]"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="conditionalContentContainerItemDragOptions"
    >
      <v-draggable-list-item
          :key="optItem.title"
          class="pl-5"
          :icon="icon(optItem.fieldType)"
          :name="optItem.title"
          :new-name="optItem.title"
          new-description=""
      />
    </draggable>

    <div style="margin-bottom: 20px"></div>
    <h4 class="pl-5">Form Fields</h4>
    <div class="field-divider"></div>
    <draggable
        v-for="field in settings.modelerPalette.formFields"
        :key="field[1].title"
        :list="[field]"
        class="list-group"
        handle=".handle"
        :clone="handleClone"
        v-bind="formFieldDragOtions"
    >
      <v-draggable-list-item
          :key="field[1].title"
          class="pl-5"
          :icon="icon(field[1].fieldType)"
          :name="field[1].title"
          :new-name="field[1].title"
          new-description=""
      />
    </draggable>
    <div class="pb-5"></div>
  </v-card>
</template>

<style scoped>

.field-divider {
  border-bottom: #ccc 2px solid;
  margin: 5px 0;
}

.palette {
  text-align: left;
  margin-bottom: 8px;
  height: 100% !important;
  padding: 0;
  min-width: 300px;
}

</style>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import VFormSection from "@/lib-components/form/VFormSection.vue";
import VDraggableListItem from "@/lib-components/common/VDraggableListItem.vue";
import {FormBuilderSettings} from "@/types/Settings";

@Component({
  components: {VDraggableListItem, VFormSection}
})
export default class VFormBuilderElements extends Vue {

  drag = false;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  secitonDragOptions = {
    animation: 200,
    group: {name: 'section', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  containerDragOptions = {
    animation: 200,
    group: {name: 'container', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  conditionalContentContainerDragOptions = {
    animation: 200,
    group: {name: 'field', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  conditionalContentContainerItemDragOptions = {
    animation: 200,
    group: {name: 'optionalItem', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  formObjectDragOtions = {
    animation: 200,
    group: {name: 'field', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  formFieldDragOtions = {
    animation: 200,
    group: {name: 'field', pull: 'clone', put: false},
    disabled: false,
    chosenClass: "draggable",
  };

  icon(type: string): string {
    return this.settings.iconSettings.iconMap[type] ?? this.settings.iconSettings.defaultIcon;
  }

  containerIcons(type: string): string {
    return this.settings.iconSettings.containerIconMap[type] ?? this.settings.iconSettings.defaultContainerIcon;
  }


  handleClone(item: any): any {
    //hier generieren
    return JSON.parse(JSON.stringify(item));
  }

}
</script>

