<template>
  <v-app style="background-color: aliceblue; padding: 5rem">
    <VFormBuilder @input="schemaChanged" :value="schema" :builder-settings="builderSettings"></VFormBuilder>
    <VJsonRenderer :schema="currentSchema"></VJsonRenderer>
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
    // console.log(JSON.stringify(this.currentSchema));
  }

  currentSchema = {};

  testSchema: any = {
    "key": "MyStartForm",
    "type": "object",
    "x-display": "stepper",
    "allOf": [
      {
        "key": "sectionKey1",
        "title": "First Section",
        "type": "object",
        "x-options": {"sectionsTitlesClasses": ["d-none"]},
        "allOf": [
          {
            "type": "object",
            "fieldType": "optionalContainer",
            "title": "Optional Content",
            "description": "",
            "default": {"myKey": "subSchema2"},
            "x-options": {"childrenClass": "pr-5 pl-0"},
            "oneOf": [
              {
                "title": "Mein neuer default Wert",
                "key": "b10c4bcd-26a7-4fa9-aaf3-02bcbb989a61",
                "x-options": {"childrenClass": "pr-5 pl-0"},
                "properties": {
                  "myKey": {
                    "fieldType": "const",
                    "type": "string",
                    "const": "subSchema2",
                  },
                  "f301cd42-9ae9-475e-9208-55ceb08091d2": {
                    "fieldType": "text",
                    "title": "Textfield",
                    "type": "string",
                    "x-options": {
                      "fieldColProps": {"cols": 12, "sm": 12}
                    },
                    "x-props": {"outlined": true, "dense": true}
                  }
                }
              },
              {
                "title": "Optional Content Item 2",
                "key": "4ccfc860-8111-4356-8a2b-cc040515aed7",
                "x-options": {"childrenClass": "pr-5 pl-0"},
                "properties": {
                  "myKey": {
                    "fieldType": "const",
                    "type": "string",
                    "const": "subSchema1",
                    "key": "myKey"
                  },
                  "e0094471-b8e2-46ff-a8ae-9f297e8925ce": {
                    "fieldType": "text",
                    "title": "Textfield",
                    "type": "string",
                    "x-options": {
                      "fieldColProps": {"cols": 12, "sm": 12}
                    },
                    "x-props": {"outlined": true, "dense": true}
                  },
                  "812df095-8af4-4cdd-98b5-94e09afba6ad": {
                    "fieldType": "textarea",
                    "title": "Textarea",
                    "x-display": "textarea",
                    "type": "string",
                    "x-options": {
                      "fieldColProps": {"cols": 12, "sm": 12}
                    },
                    "x-props": {"outlined": true, "dense": true}
                  }
                }
              }
            ]
          },
          {
            "title": "Group",
            "description": "",
            "x-options": {"childrenClass": "pr-5 pl-0"},
            "properties": {
              "19c9abab-390b-4fe5-8451-fc738036990b": {
                "fieldType": "text",
                "title": "Textfield",
                "type": "string",
                "x-options": {"fieldColProps": {"cols": 12, "sm": 12}},
                "x-props": {"outlined": true, "dense": true}
              },
              "c6e0bc53-ccb8-41ca-87f9-1e460d4b9633": {
                "fieldType": "text",
                "title": "Textfield",
                "type": "string",
                "x-options": {"fieldColProps": {"cols": 12, "sm": 12}},
                "x-props": {"outlined": true, "dense": true}
              }
            },
            "key": "d64c1f45-4ce6-4e3f-879c-d893b263e24b"
          }
        ]
      }
    ]
  };


  schema: any = {
    "key": "MyStartForm",
    "type": "object",
    "x-display": "stepper",
    "allOf": [
      {
        "key": "sectionKey1",
        "title": "First Section",
        "type": "object",
        "x-options": {
          "sectionsTitlesClasses": ["d-none"],
        },
        "allOf": [
          {
            "key": "group1",
            "title": "First Group",
            "type": "object",
            "x-options": {
              "childrenClass": "pr-5 pl-0",
            },
            "properties": {
              "stringProp1": {
                "fieldType": "text",
                "title": "I am a text",
                "type": "string",
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                },
                "x-props": {
                  "outlined": true,
                  "dense": true
                },
              },
              "numberProp1": {
                "fieldType": "integer",
                "type": "integer",
                "title": "I am a number",
                "x-options": {
                  "fieldColProps": {
                    "cols": 12,
                    "sm": 6
                  }
                },
                "x-props": {
                  "outlined": true,
                  "dense": true
                }
              },
              "textarea1": {
                "fieldType": "textarea",
                "type": "string",
                "x-display": "textarea",
                "title": "I am a textarea",
                "x-props": {
                  "outlined": true,
                  "dense": true
                }
              },
              "booleanprop": {
                "fieldType": "boolean",
                "type": "boolean",
                "title": "I am a checkbox",
                "x-props": {
                  "outlined": true,
                  "dense": true
                }
              },
              "dateprop": {
                "fieldType": "date",
                "type": "string",
                "format": "date",
                "title": "I am a date",
                "x-props": {
                  "outlined": true,
                  "dense": true
                }
              },
            }
          }]
      }
    ]
  };

}
</script>

