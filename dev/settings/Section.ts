export default {
    "type": "object",
    "x-display": "tabs",
    "x-props": {
        "grow": true
    },
    "x-options": {
        "childrenClass": "pr-5 pl-0",
    },
    "allOf": [
        {
            "title": "General",
            "type": "object",
            "properties": {
                "type": {
                    "const": "object"
                },
                "key": {
                    "type": "string",
                    "title": "Key",
                    "readOnly": true
                },
                "title": {
                    "type": "string",
                    "title": "Titel",
                    "x-props": {
                        "outlined": true,
                        "dense": true
                    },
                    "x-rules": [
                        "required"
                    ]
                },
                "description": {
                    "type": "string",
                    "title": "Description",
                    "x-props": {
                        "outlined": true,
                        "dense": true
                    }
                }
            }
        },
        {
            "title": "Options",
            "type": "object",
            "properties": {
                "x-options": {
                    "type": "object",
                    "properties": {
                        "sectionsTitlesClasses": {
                            "type": "array",
                            "title": "CSS classes for Section titels",
                            "items": {
                                "type": "string"
                            },
                            "x-props": {
                                "outlined": true,
                            },
                            "x-rules": [
                                "required"
                            ],
                            "x-options": {
                                "fieldColProps": {
                                    "cols": 12,
                                    "sm": 6
                                }
                            }
                        }
                    }
                }
            }
        }

    ]
};
