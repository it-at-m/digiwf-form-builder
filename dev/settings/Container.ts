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
                "groupType": {
                    "type": "string",
                    "title": "Type",
                    "readOnly": true
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
                },
                "x-if": {
                    "type": "string",
                    "title": "dispaly if",
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
                        "childrenClass": {
                            "type": "string",
                            "title": "CSS classes for child elements",
                            "x-props": {
                                "outlined": true,
                                "dense": true
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
