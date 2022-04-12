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
            style="min-height: 400px;"
            :value="{...value, key: fieldKey}"
            :schema="schema"
            @input="onFormUpdate"
        />
      </v-form>
    </template>
  </VDialogListItem>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {FormField, FormFieldContainer} from "@/types/Form";
import VFormField from "@/lib-components/form/VFormField.vue";
import VDialogListItem from "@/lib-components/common/VDialogListItem.vue";
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";

@Component({
  components: {VDialogListItem, VFormField, VJsonRenderer}
})
export default class VEditFormFieldModal extends Vue {

  valid = false;
  dialog = false;
  currentValue = {};

  @Prop()
  schemas!: any;

  @Prop()
  genericSchema!: any;

  @Prop()
  value!: FormField;

  @Prop()
  fieldKey!: string

  @Emit("saved")
  saved(): any {
    return this.currentValue;
  }

  mounted() {
    this.currentValue = {...this.value, key: this.fieldKey};
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

  onFormUpdate(value: FormFieldContainer): void {
    this.currentValue = value;
  }

  get schema(): any {
    return this.schemas[this.value.fieldType.toString()] ?? this.genericSchema;
  }

}
</script>
