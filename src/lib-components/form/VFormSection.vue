<template>
  <v-card class="mb-3">
    <v-list-group
        no-action
        class="section-header"
        append-icon=""
    >
      <template #activator>
        <v-flex class="section-content">
          <v-icon
              size="30"
              class="mr-5 handle"
          >
            mdi-tab
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
                  :schema="settings.sectionSchema"
                  @saved="onSectionChanged"
              />
              <v-list-item
                  link
                  @click="sectionRemoved"
              >
                <v-list-item-title>Entfernen</v-list-item-title>
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
        <v-form-container
            v-for="container in value.allOf"
            :key="uuid(container)"
            :value="container"
            @input="onContainerChanged"
            @remove="onContainerRemoved"
        />
        <div
            v-if="value.allOf < 1"
            slot="header"
            role="group"
            class="d-flex align-center"
            style="min-height: 60px; margin-left: 30px"
        >
          insert container
        </div>
      </draggable>
    </v-list-group>
  </v-card>
</template>

<style>

.section-header > div:first-child {
  background-color: #f4f4f4;
}

</style>

<style scoped>

.section-content {
  width: 100%;
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;
}

.handle {
  cursor: grab;
}
</style>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator';
import {Container, Section} from "@/types/Form";
import VFormContainer from "@/lib-components/form/VFormContainer.vue";
import VEditSectionModal from "@/lib-components/modal/VEditSectionModal.vue";
import {generateUUID} from "@/utils/UUIDGenerator";
import {FormBuilderSettings} from "@/types/Settings";

@Component({
  components: {VEditSectionModal, VFormContainer}
})
export default class VFormSection extends Vue {

  dragOptions = {
    animation: 200,
    group: "container",
    disabled: false
  }

  @Prop()
  value!: Section;

  @Inject("builderSettings")
  settings!: FormBuilderSettings;

  @Emit("input")
  input(value: Section): any {
    return value;
  }

  @Emit("remove")
  sectionRemoved(): string {
    return this.value.key;
  }

  onListChanged(): void {
    this.input(this.value);
  }

  uuid(container: Container): string {
    if (container.key) return container.key;
    const key = generateUUID();
    this.$set(container, "key", key);
    this.input(this.value);
    return container.key;
  }

  onContainerChanged(container: Container): void {
    for (let i = 0; i < this.value.allOf.length; i++) {
      if (this.value.allOf[i].key === container.key) {
        Vue.set(this.value.allOf, i, container);
        this.input(this.value);
        return;
      }
    }
  }

  onSectionChanged(section: Section): void {
    const newSection = {
      ...section,
      allOf: this.value.allOf
    };
    this.input(newSection);
  }

  onContainerRemoved(key: string): any {
    this.value.allOf = this.value.allOf.filter((el: Container) => el.key != key);
    this.input(this.value);
  }

}
</script>


