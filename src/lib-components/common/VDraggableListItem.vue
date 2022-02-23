<template>
  <v-list-item
    link
    class="handle"
  >
    <div class="box-view">
      <v-icon class="mr-2">
        {{ icon }}
      </v-icon>
      {{ name }}
    </div>
    <div :class="allDragClasses">
      <div class="d-flex flex-row">
        <v-icon
          size="30"
          class="mr-5 handle"
        >
          {{ icon }}
        </v-icon>
        <div class="mt-3 d-flex align-items-start justify-content-end flex-column">
          <span class="font-weight-bold">{{ newName }}</span>
          <span>{{ newDescription }}</span>
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VFormSection from "@/lib-components/form/VFormSection.vue";

@Component({
  components: {VFormSection}
})
export default class VDraggableListItem extends Vue {

  @Prop({type: String, default: ""})
  name!: string;

  @Prop({type: String, default: ""})
  newName!: string;

  @Prop({type: String, default: ""})
  newDescription!: string;

  @Prop({type: String, default: ""})
  icon!: string;

  @Prop({type: String, default: ""})
  dragClasses!: string;

  get allDragClasses(): string {
    return this.dragClasses + " drag-view";
  }

}
</script>

<style>

.drag-view {
  display: none;
}

</style>
