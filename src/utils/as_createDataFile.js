/**
 * @param {*} filesList Folder or Array [File]
 * @param {File} outFile
 * @param {string} fileExtension
 */
function as_createDataFile(filesList, outFile, fileExtension) {

    if (fileExtension === undefined) {
        fileExtension = "";
    }

    var key = as_getFileName(outFile);
    var jsonString;

    if (filesList instanceof Folder) {
        filesList = filesList.getFiles("*" + fileExtension);
    }

    // Loop files
    var data = {};
    for (var f = 0, file, binString; f < filesList.length; f++) {
		file = filesList[f];
		
		if (!file || !file.exists) {
			alert("Error. File " + JSON.stringify(file.fullName) + " is missing.");
			continue;
		}

        binString = as_fileToBinaryString(file);
        if (binString !== null) {
            data[file.displayName] = binString;
        }
    }
    var jsonString = "var " + key + " = " + JSON.stringify(data, undefined, "\t") + ";";

    as_fileWrite(outFile, jsonString, false);
}