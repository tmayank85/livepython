
const newFileContent =  "# Write your python code here.\n";

export const saveFile =  (fileName: string, fileContent: string) => {

    const files = JSON.parse(localStorage.getItem('files')) || [];
    const fileNameList = JSON.parse(localStorage.getItem('fileNameList')) || [];
    const newFile = { fileName, fileContent };

    // Check if file with the same name already exists
    const existingFileIndex = files.findIndex(file => file.fileName === fileName);
    if (existingFileIndex !== -1) {
        files[existingFileIndex] = newFile; // Replace the file content if exists
    } else {
        files.push(newFile); // Add new file if doesn't exist
        fileNameList.push(fileName);
    }

    localStorage.setItem('files', JSON.stringify(files));
    localStorage.setItem('fileNameList', JSON.stringify(fileNameList));
};


export const getFileNameList =  () => {
    const fileList = JSON.parse(localStorage.getItem('fileNameList')) || [];
    if (fileList.length === 0) {
        const newFile = "untitled1.py";
         saveFile(newFile, newFileContent);
        fileList.push(newFile);
    }
    return fileList;
}

export const createNewFile =  () => {
    const fileList = JSON.parse(localStorage.getItem('fileNameList')) || [];
    const fileName = `untitled${fileList.length + 1 }.py`;
     saveFile(fileName, newFileContent);
}

export const getFile =  (fileName: string) => {

    if(fileName===null || fileName===undefined || fileName===""){
        return "File not found";
    }

    const files = JSON.parse(localStorage.getItem('files')) || {};
    // Check if file with the same name already exists
    
    const existingFileIndex = files.findIndex(file => file.fileName === fileName);
    if (existingFileIndex !== -1) {
        return files[existingFileIndex];
    }
    else{
         saveFile(fileName, newFileContent);
        return {fileName: fileName, fileContent: newFileContent};
    }
}

