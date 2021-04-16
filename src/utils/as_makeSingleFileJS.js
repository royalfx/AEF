/**
 * @param {Folder} rootDir
 * @param {Object} config
 * @param {File} includeFile
 * @param {File} outFile
 */
function as_makeSingleFileJS(rootDir, config, includeFile, outFile) {

    var collectedFiles = {};
	var text = "'use strict'";

    // Do
    var inclText = as_fileRead(includeFile);
    var inclLines = inclText.split("\n");
    for (var j = 0; j < inclLines.length; j++) {
        inclLine = inclLines[j];
        if (inclLine.indexOf("src=") >= 0) {

            // Get file
            var path = inclLine.replace("document.write('<script type=\"text/javascript\" src=\"", "");
            path = path.replace("\"></script>');", "");

            // Collect
			collectFile(File(as_convertFilePath(path, rootDir, true)), config, collectedFiles);
        }
    }

    // Replace multiple line breaks
    text = text.replace(/\n\s*\n\s*\n/g, "\n\n");

    // Save
    as_fileWrite(outFile, text, false);

    /**
     * @param {File} file
     */
	function collectFile(file, config, collectedFiles) {

        // Skip not exist
        if (!file.exists) {
            return;
        }

        // Skip already added
        if (collectedFiles[file.fullName] != null) {
            return;
        }
        collectedFiles[file.fullName] = 1;

        // Skip file
        if (as_arrayCheckValue(file.displayName, config.skipFiles) >= 0) {
            return;
        }

        // Read file
        var fileText = as_fileRead(file);

        // Split lines
        var linesArray = fileText.split("\n");

		// Loop lines
		for (var l = 0, line; l < linesArray.length; l++) {
			line = linesArray[l];

			// Skip lines with tags
			for (var i = 0, tag; i < config.skipLines.length; i++) {
				tag = config.skipLines[i];
				if (line.indexOf(tag) >= 0) {
					linesArray.splice(l, 1);
					l--;
					continue;
				}
			}

            // Include lines with tags
            for (var i = 0, inx, tag; i < config.includeLines.length; i++) {
                tag = config.includeLines[i];
                inx = line.indexOf(tag);
                if (inx >= 0) {
					linesArray[l] = line.replace("/" + "/ " + tag, "");
                }
            }
		}

        // Join again
        fileText = linesArray.join("\n");

        // Clear block comments
        fileText = fileText.replace(/\/\*(?:(?!\*\/).|[\n\r])*\*\//gm, "");

        // Clear line comments
        linesArray = fileText.split("\n");
        for (var l = 0, line, lineTabsClear; l < linesArray.length; l++) {
            line = linesArray[l];
            lineTabsClear = line.replace(new RegExp("\t|\s", "g"), "");
			if ((lineTabsClear.indexOf("/" + "/") == 0) || (line.indexOf("use strict") >= 0)) {
                linesArray.splice(l, 1);
                l--;
                continue;
            }
        }

        text = text + "\n" + linesArray.join("\n");
    }
}


