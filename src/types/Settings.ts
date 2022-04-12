export interface IconSettings {
    iconMap: Record<string, string>;
    containerIconMap: Record<string, string>;
    defaultIcon: string;
    defaultContainerIcon: string;
}

export interface ModelerPaletteSettings {
    formFields: any[];
    containers: any[];
    optionalContent: any[];
    optionalItem: any[];
    objects: any[];
    sections: any[];
}

export interface FormBuilderSettings {
    iconSettings: IconSettings;
    modelerPalette: ModelerPaletteSettings;
    formFieldSchemas: Record<string, string>;
    defaultFormFieldSchema: any;
    containerSchema: any;
    sectionSchema: any;
}
