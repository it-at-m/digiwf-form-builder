import {FormBuilderSettings} from "@/types/Settings";
import {defaultIcon, iconMap} from "./IconMap";
import container from "./Container";
import section from "./Section";
import {containerPalette, formFieldPalette, objectPalette, sectionPalette} from "./ModelerPalette";
import {genericSchema, schemaMap} from "./FormFields";

export const Settings: FormBuilderSettings = {
    iconSettings: {
        iconMap: iconMap,
        defaultIcon: defaultIcon
    },
    modelerPalette: {
        formFields: formFieldPalette,
        containers: containerPalette,
        objects: objectPalette,
        sections: sectionPalette
    },
    containerSchema: container,
    sectionSchema: section,
    defaultFormFieldSchema: genericSchema,
    formFieldSchemas: schemaMap
}
