var example_ui_data = {
	"groupMain": {
		"type": "group",
		"orientation": "column",
		"alignChildren": [
			"left",
			"top"
		],
		"spacing": 7
	},
	"groupManipulate": {
		"type": "group",
		"parent": "groupMain",
		"orientation": "row",
		"alignChildren": [
			"left",
			"center"
		],
		"spacing": 5
	},
	"groupMan1": {
		"type": "group",
		"parent": "groupManipulate",
		"orientation": "column",
		"alignChildren": [
			"left",
			"center"
		],
		"spacing": 5
	},
	"btnRLeft": {
		"type": "button",
		"parent": "groupMan1",
		"size": [
			50,
			25
		],
		"text": "<<"
	},
	"btnTLeft": {
		"type": "button",
		"parent": "groupMan1",
		"size": [
			50,
			25
		],
		"text": "left"
	},
	"groupMan2": {
		"type": "group",
		"parent": "groupManipulate",
		"orientation": "column",
		"alignChildren": [
			"left",
			"center"
		],
		"spacing": 5
	},
	"btnTUp": {
		"type": "button",
		"parent": "groupMan2",
		"size": [
			50,
			25
		],
		"text": "up"
	},
	"btnTDown": {
		"type": "button",
		"parent": "groupMan2",
		"size": [
			50,
			25
		],
		"text": "down"
	},
	"groupMan3": {
		"type": "group",
		"parent": "groupManipulate",
		"orientation": "column",
		"alignChildren": [
			"left",
			"center"
		],
		"spacing": 5
	},
	"btnRRight": {
		"type": "button",
		"parent": "groupMan3",
		"size": [
			50,
			25
		],
		"text": ">>"
	},
	"btnTRight": {
		"type": "button",
		"parent": "groupMan3",
		"size": [
			50,
			25
		],
		"text": "right"
	}
};