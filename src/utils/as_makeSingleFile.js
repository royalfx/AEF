/**
 * @param {Folder} rootDir
 * @param {Object} config
 * @param {File} mainFile
 * @param {File} outFile
 */
function as_makeSingleFile(rootDir, config, mainFile, outFile) {

	// Declare vars
    var collectedFiles = {};

    // Do
	var text = recursiveCollectFiles(mainFile, config, collectedFiles);

	// Replace multiple line breaks
	while (text.match(/\n\n/gi) != null) {
		text = text.replace(/\n\n/gi, "\n");
	}

    // Save
    as_fileWrite(outFile, text, false);

    /**
     * @param {File} file
	 * @param {Object} config
	 * @param {Object} collectedFiles
     */
	function recursiveCollectFiles(file, config, collectedFiles) {

		// Skip already collected files
        if (collectedFiles[file.fullName] != null) {
            return "";
        }
        collectedFiles[file.fullName] = 1;

        // Check include later
        for (var i = 0; i < config.includeLater.length; i++) {
            if (config.includeLater[i].indexOf(file.displayName) >= 0) {
                return "later('" + config.includeLater[i] + "');";
            }
        }

        // Read file
        var fileText = as_fileRead(file);

        // Skip file
        if (as_arrayCheckValue(file.displayName, config.skipFiles) >= 0) {
            return "";
        }

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
                    linesArray[l] = line.replace("// " + tag, "");
				}
			}
		}

        // Join again
        fileText = linesArray.join("\n");

        // Clear comments
        fileText = fileText.replace(/\/\*(?:(?!\*\/).|[\n\r])*\*\//gm, "");

        // Split again
        linesArray = fileText.split("\n");

        // Loop vars
        var lines = [],
            path,
            filePath;

        // Loop lines
        for (var l = 0, line, lineWithoutTabs; l < linesArray.length; l++) {
            line = linesArray[l];
            lineWithoutTabs = line.replace(new RegExp("\t|\s", "g"), "");

            // Remember path
            if (lineWithoutTabs.indexOf("#includepath ") == 0) {
                path = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));

            // Include file
            } else if (lineWithoutTabs.indexOf("#include ") == 0) {

                // Relative path
                if (line.indexOf("..") >= 0) {
                    filePath = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));
                    while (filePath.indexOf("../") >= 0) {
                        filePath = filePath.replace("../", "");
                    }
                    filePath = rootDir.fullName + "/" + filePath;

                // Absolute path
                } else if (line.indexOf("/") >= 0) {
                    filePath = (line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\"")));

                // Use #includepath
                } else {
                    filePath = (path + "/" + line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\"")));
                    while (filePath.indexOf("../") >= 0) {
                        filePath = filePath.replace("../", "");
                    }
                    filePath = rootDir.fullName + "/" + filePath;
                }
				lines.push(recursiveCollectFiles(File(filePath), config, collectedFiles));

			// Skip comments
            } else if (lineWithoutTabs.indexOf("//") !== 0) {
                lines.push(line);
            }
        }
        return lines.join("\n");
    }
}


