<template>
  <v-dialog
    v-model="isOpen"
    persistent
    max-width="800px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        link
        v-bind="attrs"
        v-on="on"
      >
        {{ title }}
      </v-btn>
    </template>
    <v-card v-if="isOpen">
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <slot />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          min-width="150"
          outlined
          @click="onCancel"
        >
          {{ cancelButtonText }}
        </v-btn>
        <v-btn
          min-width="150"
          color="primary"
          @click="onSave"
        >
          {{ saveButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

@Component({
  components: {}
})
export default class VDialogButton extends Vue {

  isOpen = false;

  @Prop({type: Boolean, default: false})
  dialog!: boolean;
  @Prop({type: String, default: ""})
  title!: string;
  @Prop({type: String, default: ""})
  cancelButtonText!: string;
  @Prop({type: String, default: ""})
  saveButtonText!: string;

  @Watch("dialog")
  onDialogChange(value: boolean) {
    this.isOpen = value;
  }

  @Emit("cancel")
  onCancel(): void {
    //
  }

  @Emit("save")
  onSave(): void {
    //
  }

}
</script>

<style>

</style>
