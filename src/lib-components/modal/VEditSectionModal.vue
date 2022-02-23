<template>
  <VDialogListItem
    cancel-button-text="Cancel"
    save-button-text="Save"
    title="Edit"
    :dialog="dialog"
    @cancel="onCancelForm"
    @save="onSaveForm"
  >
    <template #default>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-json-renderer
          style="min-height: 300px;"
          :value="value"
          :schema="schema"
          @input="onFormUpdate"
        />
      </v-form>
    </template>
  </VDialogListItem>
</template>


<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {Section} from "@/types/Form";
import VFormField from "@/lib-components/form/VFormField.vue";
import VDialogListItem from "@/lib-components/common/VDialogListItem.vue";
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";

@Component({
  components: {VDialogListItem, VFormField, VJsonRenderer} })
export default class VEditSectionModal extends Vue {
  valid = false;
  dialog = false;
  currentValue = {};

  @Prop()
  schema!: any;

  @Prop()
  value!: Section;

  @Emit("saved")
  saved(): any {
    return this.currentValue;
  }

  mounted() {
    this.currentValue = this.value;
  }

  onSaveForm(): void {
    (this.$refs.form as HTMLFormElement).validate();
    if (this.valid) {
      this.dialog = true;
      this.$nextTick(() => {
        this.dialog = false;
      });
      this.saved();
    }
  }

  onCancelForm(): void {
    this.dialog = true;
    this.$nextTick(() => {
      this.dialog = false;
    });
  }

  onFormUpdate(value: Section): void {
    this.currentValue = value;
  }

}
</script>
