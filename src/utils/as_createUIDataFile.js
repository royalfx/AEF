/**
 * @param {File} fileCSV
 * @param {File} fileJS
 */
function as_createUIDataFile(fileCSV, fileJS) {
    var key = as_getFileName(fileJS);
    var stringJSON = "var " + key + " = " + JSON.stringify(as_parseCSV(fileCSV), undefined, "\t") + ";";
    as_fileWrite(fileJS, stringJSON, false);
}