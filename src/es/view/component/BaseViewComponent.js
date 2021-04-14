/**
 * @constructor
 * @class BaseViewComponent
 * @extends BaseEventTarget
 * @param {Object} uiContainer
 */
function BaseViewComponent(uiContainer) {
	/*ASSERT*/AssertManager.instanceOf(uiContainer, Object);
	BaseEventTarget.call(this);
	this._uiContainer = uiContainer;
}

/**
 * @description Inheritance
 */
BaseViewComponent.prototype = new BaseEventTarget;
BaseViewComponent.prototype.constructor = BaseViewComponent;

/**
 * @public
 */
BaseViewComponent.prototype.initializeComponent = function () {
	this._stopListHandling = false;
	this._stopFocusHandling = false;
	this._stopUserInputHandling = false;
}

/**
 * @public
 */
BaseViewComponent.prototype.getUIContainer = function() {
	return this._uiContainer;
}

/**
 * @public
 * @param {boolean} enabled
 */
BaseViewComponent.prototype.setEnabled = function(enabled) {
	this._uiContainer.enabled = enabled;
}

/**
 * @protected
 * @param {DropDownList} list
 * @param {*} value
 * @param {Array} itemsText
 * @param {Array} itemsData
 */
BaseViewComponent.prototype._updateDropDownList = function (list, value, itemsText, itemsData) {
	this._stopListHandling = true;

	// Use previous selection
	if ((value === undefined) && list.selection) {
		value = list.selection.itemData;
	}

	// Re-create list
	if ((itemsText !== undefined) && (itemsText !== undefined)) {
		list.removeAll();
		for (var i = 0, listItem; i < itemsText.length; i++) {
			listItem = list.add("item", itemsText[i]);
			listItem.itemData = itemsData[i];
			if ((value != null) && DataTools.isEquals(value, listItem.itemData)) {
				list.selection = listItem;
			}
		}

	// Just select item
	} else {
		for (var i = 0, listItem; i < list.items.length; i++) {
			listItem = list.items[i];
			if ((value != null) && DataTools.isEquals(value, listItem.itemData)) {
				list.selection = listItem;
			}
		}
	}

	// No selection
	if (value === null) {
		list.selection = null;

	// Select first item if no one selected
	} else if (list.selection == null) {
		list.selection = 0;
	}

	this._stopListHandling = false;
}

/**
 * @protected
 * @param {ListBox} listBox
 * @param {Array} icons [ScriptUIImage]
 * @param {Array} itemsText
 * @param {Array} itemsData
 * @param {Array} itemsSubItems
 */
BaseViewComponent.prototype._updateListBox = function (listBox, value, icons, itemsText, itemsData, itemsSubItems) {
	this._stopListHandling = true;

	// // create list box with two titled columns
	// var list = dlg.add('ListBox', [0, 0, 150, 75], 'asd',
	// 	{
	// 		numberOfColumns: 2, showHeaders: true,
	// 		columnTitles: ['First Name', 'Last Name']
	// 	});
	// // add an item for the first row, with the label value for the first column
	// var item1 = list.add('item', 'John');
	// // add the label value for the second column in that row.
	// item1.subItems[0].text = 'Doe';
	// // add an item for the second row, with the text for the first column label
	// var item2 = list.add('item', 'Jane');
	// // add the label text and image for the second column in the second row
	// item2.subItems[0].text = 'Doe';
	// item2.subItems[0].image = File("~/Desktop/Step1.png");

	// Use previous selection
	var value;
	if ((value === undefined) && listBox.selection) {
		value = listBox.selection.itemData;
	}

	// Re-create list
	if ((itemsText !== undefined) && (itemsData !== undefined) && (itemsSubItems !== undefined)) {
		listBox.removeAll();
		for (var i = 0, item, subItems; i < itemsText.length; i++) {
			// Add item
			item = listBox.add("item", itemsText[i]);
			item.itemData = itemsData[i];
			// Add subitems
			subItems = itemsSubItems[i];
			for (var s = 0; s < subItems.length; s++) {
				item.subItems[s].text = subItems[s];
			}
			if (icons[i] != null) {
				item.subItems[0].image = icons[i];
			}
		}
	}
	
	if (value !== undefined) {
		for (var i = 0, listItem; i < listBox.items.length; i++) {
			listItem = listBox.items[i];
			if (listItem.itemData == value) {
				listBox.selection = listItem;
			}
		}
	}

	// Select first item if no one selected
	if (listBox.selection == null) {
		listBox.selection = 0;
	}

	this._stopListHandling = false;
}

/**
 * 
 * @param {*} textField 
 * @param {*} value (Optional)
 * @param {RegExp} regexp (Optional)
 * @param {boolean} allowEmpty (Optional)
 * @param {number} min (Optional)
 * @param {number} max (Optional)
 * @param {number} decimals (Optional)
 */
BaseViewComponent.prototype._formatTextFieldValue = function (textField, value, regexp, allowEmpty, min, max, decimals) {
	/*ASSERT*/AssertManager.significant(textField);

	var outText = (value !== undefined) ? value.toString() : textField.text;

	// RegExp
	if (regexp !== undefined) {
		/*ASSERT*/AssertManager.instanceOf(regexp, RegExp);
		if (outText.match(regexp) !== null) {
			outText = outText.replace(regexp, "");
		}
	}

	// empty
	if (outText.length == 0) {
		if (allowEmpty !== undefined) {
			/*ASSERT*/AssertManager.typeBoolean(allowEmpty);
			if (allowEmpty) {
				textField.text = outText;
				return;
			} else {
				outText = "0";
			}
		}
	}

	// min & max
	if ((min !== undefined) && (max !== undefined)) {
		/*ASSERT*/AssertManager.typeNumber(min);
		/*ASSERT*/AssertManager.typeNumber(max);
		if (!isNaN(parseFloat(outText))) {
			outText = as_clamp(parseFloat(outText), min, max).toString();
		} else {
			outText = as_clamp(0, min, max).toString();
		}
	}

	// decimals
	if (decimals !== undefined) {
		/*ASSERT*/AssertManager.typeNumber(decimals);
		outText = parseFloat(parseFloat(outText).toFixed(decimals)).toString();
	}

	// Set
	if (textField.text != outText) {
		textField.text = outText;
	}
}

/**
 * @protected
 * @type {Object}
 */
BaseViewComponent.prototype._uiContainer = null;

/**
 * @protected
 * @type {boolean}
 */
BaseViewComponent.prototype._stopListHandling = null;

/**
 * @protected
 * @type {boolean}
 */
BaseViewComponent.prototype._stopFocusHandling = null;

/**
 * @protected
 * @type {boolean}
 */
BaseViewComponent.prototype._stopUserInputHandling = null;