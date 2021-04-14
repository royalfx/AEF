/**
 * @param {Folder} rootDir
 * @param {Object} config
 * @param {File} mainFile
 * @param {File} outFile
 */
function as_insertRemainingFiles(rootDir, config, mainFile, outFile) {

    // Read file
    var fileText = as_fileRead(mainFile);

    // Loop later files
    for (var i = 0; i < config.includeLater.length; i++) {
        var filePath = config.includeLater[i];
        var key = "later('" + filePath + "');";

        // Get later file
        if (filePath.indexOf("..") >= 0) {
            while (filePath.indexOf("../") >= 0) {
                filePath = filePath.replace("../", "");
            }
            filePath = rootDir.fullName + "/" + filePath;
        }

        // Replace
        fileText = fileText.replace(key, "\n#include " + JSON.stringify(filePath) + ";\n");
    }

    // Save
    as_fileWrite(outFile, fileText, false);
}