import {FormBuilderSettings} from "@/types/Settings";
import {containerIconMap, defaultContainerIcon, defaultIcon, iconMap} from "./IconMap";
import {conditionalContainerSchema, containerSchema} from "./Container";
import section from "./Section";
import {
    containerPalette,
    formFieldPalette,
    objectPalette,
    optionalContent,
    optionalItem,
    sectionPalette
} from "./ModelerPalette";
import {genericSchema, schemaMap} from "./FormFields";

export const Settings: FormBuilderSettings = {
    iconSettings: {
        containerIconMap: containerIconMap,
        iconMap: iconMap,
        defaultIcon: defaultIcon,
        defaultContainerIcon: defaultContainerIcon
    },
    modelerPalette: {
        formFields: formFieldPalette,
        containers: containerPalette,
        objects: objectPalette,
        sections: sectionPalette,
        optionalContent: optionalContent,
        optionalItem: optionalItem
    },
    containerSchema: containerSchema,
    conditionalContainerSchema: conditionalContainerSchema,
    sectionSchema: section,
    defaultFormFieldSchema: genericSchema,
    formFieldSchemas: schemaMap
}
