<template>
  <v-app style="background-color: aliceblue; padding: 5rem">
    <VFormBuilder @input="schemaChanged" :value="schema" :builder-settings="builderSettings"></VFormBuilder>
    <div style="background-color: white; padding: 10px">
      <VJsonRenderer @input="valueChanged" :options="{}" :schema="currentSchema"></VJsonRenderer>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import {VJsonRenderer} from "@muenchen/digiwf-form-renderer";
import {VFormBuilder} from "@/lib-components";
import {Settings} from "./settings/Settings";

@Component({
  components: {VFormBuilder, VJsonRenderer}
})
export default class App extends Vue {

  builderSettings = Settings;

  schemaChanged(schema: any): void {
    this.currentSchema = schema;
    this.$forceUpdate();
  }

  valueChanged(value: any): void {
    console.log(value);
  }

  schema: any = {
    "key": "MyStartForm", "type": "object", "allOf": [{
      "key": "sectionKey1",
      "title": "First Section",
      "type": "object",
      "x-options": {"sectionsTitlesClasses": ["d-none"]},
      "allOf": [{
        "key": "group1",
        "title": "First Group",
        "type": "object",
        "x-options": {"childrenClass": "pl-0"},
        "properties": {
          "stringProp1": {
            "fieldType": "text",
            "title": "I am a text",
            "type": "string",
            "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
            "x-props": {"outlined": true, "dense": true}
          },
          "numberProp1": {
            "fieldType": "integer",
            "type": "integer",
            "title": "I am a number",
            "x-options": {"fieldColProps": {"cols": 12, "sm": 6}},
            "x-props": {"outlined": true, "dense": true}
          },
          "textarea1": {
            "fieldType": "textarea",
            "type": "string",
            "x-display": "textarea",
            "title": "I am a textarea",
            "x-props": {"outlined": true, "dense": true}
          },
          "booleanprop": {
            "fieldType": "boolean",
            "type": "boolean",
            "title": "I am a checkbox",
            "x-props": {"outlined": true, "dense": true}
          },
          "dateprop": {
            "fieldType": "date",
            "type": "string",
            "format": "date",
            "title": "I am a date",
            "x-props": {"outlined": true, "dense": true}
          }
        }
      }]
    }]
  };


  currentSchema = this.schema;


}
</script>

