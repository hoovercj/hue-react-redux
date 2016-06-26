ActionTypes:
DONE: GET_LIGHTS, GET_LIGHTS_SUCCESS, GET_LIGHTS_FAILURE,
DONE: SET_LIGHT_STATE, SET_LIGHT_STATE_SUCCESS, SET_LIGHT_STATE_FAILURE,

NEXT: GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_FAILURE,
NEXT: SET_GROUP_STATE, SET_GROUP_STATE_SUCCESS, SET_GROUP_STATE_FAILURE,

FUTURE:
// SET_LIGHT_NAME, SET_LIGHT_NAME_SUCCESS, SET_LIGHT_NAME_FAILURE,
// SET_GROUP_NAME, SET_GROUP_NAME_SUCCESS, SET_GROUP_NAME_FAILURE,

// SET_GROUP_SCENE, SET_GROUP_SCENE_SUCCESS, SET_GROUP_SCENE_FAILURE,
// GET_SCENES, GET_SCENES_SUCCESS, GET_SCENES_FAILURE,
// SET_SCENE_NAME, SET_SCENE_NAME_SUCCESS, SET_SCENE_NAME_FAILURE,


Components:
<Light>
    Name
    <LightSwitch />
    <ColorPicker />
</Light>

<LightsList>
    <Light>
</LightsList>

<Group>
    Name
    <LightSwitch />
    <ColorPicker />
    <LightsList>
</Group>

<GroupsList>
    <Group>
</GroupsList>

```
State Tree:
{
    lightsList: {
        loading: false,
        error: null,
        lights: {
            1: {
                name: '',
                state: {
                    on: true,
                    sat: 2,
                    hue: 100,
                    bri: 100,
                }
            }
        }
    },
    groupsList: {
        loading: false,
        error: null,
        groups: {
            1: {
                name: '',
                lights: [1, 2]
                "state": {
                    "all_on": false,
                    "any_on": false
                },
            }
        }
    }
    scenesList: {
        loading: false,
        error: null,
        scenes: {
            "JfSzgUikoMnZ-Wy": {
                "name": "Savanna sunset",
                "lights": [
                    "2",
                    "3"
                ],
            }
        }
    }
}
```