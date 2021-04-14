/**
 * @param {*} sourceDir 
 * @param {*} targetDir 
 */
function as_syncDirectories(sourceDir, targetDir) {

	// Copy
	as_loopDirectories(sourceDir, true, syncDir, [], undefined);

	// Remove unneded
	as_loopDirectories(targetDir, true, removeIfUnnededDir, [], undefined);

	function syncDir(dir) {
		var newDir = Folder(dir.fullName.replace(sourceDir.parent.fullName, targetDir.parent.fullName));
		if (!newDir.exists) {
			newDir.create();
		}
		as_loopFiles(dir, true, syncFile, [], undefined, undefined);
	}

	function syncFile(file) {
		var newFile = File(file.fullName.replace(sourceDir.parent.fullName, targetDir.parent.fullName));
		file.copy(newFile);
	}

	function removeIfUnnededDir(dir) {
		var srcDir = Folder(dir.fullName.replace(targetDir.parent.fullName, sourceDir.parent.fullName));
		if (!srcDir.exists) {
			dir.remove();
		} else {
			as_loopFiles(dir, true, removeIfUnnededFile, [], undefined, undefined);
		}
	}

	function removeIfUnnededFile(file) {
		var srcFile = File(file.fullName.replace(targetDir.parent.fullName, sourceDir.parent.fullName));
		if (!srcFile.exists) {
			file.remove();
		}
	}

}