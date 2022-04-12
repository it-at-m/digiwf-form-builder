
export interface IconSettings {
    iconMap: Record<string,string>;
    defaultIcon: string
}

export interface ModelerPaletteSettings {
    formFields: any[];
    containers: any[];
    objects: any[];
    sections: any[];
}

export interface FormBuilderSettings {
    iconSettings: IconSettings;
    modelerPalette: ModelerPaletteSettings;
    formFieldSchemas: Record<string,string>;
    defaultFormFieldSchema: any;
    containerSchema: any;
    sectionSchema: any;
    conditionalContainerSchema: any;
}
