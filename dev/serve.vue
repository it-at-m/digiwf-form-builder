<template>
  <v-app style="background-color: aliceblue; padding: 5rem">
    <VFormBuilder @input="schemaChanged" :value="schema" :builder-settings="builderSettings"></VFormBuilder>
    <div style="background-color: white; padding: 10px">
      <VJsonRenderer :schema="currentSchema"></VJsonRenderer>
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

  schema: any = {
    "key": "MyStartForm", "type": "object", "allOf": [{
      "key": "sectionKey1",
      "title": "First Section",
      "type": "object",
      "x-options": {"sectionsTitlesClasses": ["d-none"]},
      "allOf": [{
        "containerType": "optionalContainer",
        "title": "Optional Container",
        "type": "object",
        "description": "",
        "x-options": {"childrenClass": "pr-5 pl-0", "fieldColProps": {"cols": 12, "sm": 12}},
        "x-props": {"outlined": true, "dense": true},
        "oneOf": [{
          "title": "Male",
          "key": "37c6970f-94b5-46ad-a530-df8a9f410480",
          "x-options": {"childrenClass": "pr-5 pl-0"},
          "properties": {"gender": {"fieldType": "const", "type": "string", "const": "male", "key": "gender"}}
        }, {
          "title": "Female",
          "key": "27564b1e-010a-4a0f-854d-0c7393fe4aa3",
          "x-options": {"childrenClass": "pr-5 pl-0"},
          "properties": {"gender": {"fieldType": "const", "type": "string", "const": "female", "key": "gender"}}
        }, {
          "title": "Diverse",
          "key": "1d03a3d6-f896-442b-b4fc-c88c085c9094",
          "x-options": {"childrenClass": "pr-5 pl-0"},
          "properties": {"gender": {"fieldType": "const", "type": "string", "key": "gender", "const": "diverse"}}
        }],
        "key": "b0b78958-a273-4caa-8631-464f3cc4f975"
      }, {
        "key": "group1",
        "title": "First Group",
        "type": "object",
        "x-options": {"childrenClass": "pr-5 pl-0"},
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

