/**
 * @version 1.0.1
 * @date Mar 21 2021
 * 
 * @param {Array} dirsAndFiles [File/Folder]
 * @param {Folder} rootDir
 * @param {boolean} intoSubfolders
 * @param {Array} filterFileExt [string] (Optional)
 * 
 * @description Only absolute paths
 */
function as_fileCollectIncludeJS(dirsAndFiles, rootDir, intoSubfolders, filterFileExt) {
	var collector = [];

	// Loop items
	for (var i = 0, item; i < dirsAndFiles.length; i++) {
		item = dirsAndFiles[i];

		// File
		if (item instanceof File) {
			handleFile(item);

			// Folder
		} else if (item instanceof Folder) {
			as_loopFiles(item, intoSubfolders, handleFile, [collector], filterFileExt);

			// Error
		} else {
			//
		}
	}

	function handleFile(file, collector) {
		var filePath = as_convertFilePathJS(file.fullName, rootDir, true);
		collector.push("document.write(\'<script type=\"text/javascript\" src=\"" + filePath + "\"></script>\');");
	}

	return collector.join("\n");



}