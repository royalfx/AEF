/**
 * @param {File} sourceFile 
 * @param {File} targetFile
 */
function as_copyHTMLBody(sourceFile, targetFile) {
    var htmlSource = as_fileRead(sourceFile);
    var htmlTarget = as_fileRead(targetFile);
    var stringOld = htmlTarget.substring(htmlTarget.indexOf("<body>"), htmlTarget.indexOf("</body>"));
    var stringNew = htmlSource.substring(htmlSource.indexOf("<body>"), htmlSource.indexOf("</body>"));
    htmlTarget = htmlTarget.replace(stringOld, stringNew);
    as_fileWrite(targetFile, htmlTarget);
}