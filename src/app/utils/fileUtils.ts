
const newFileContent =  "# Write your python code here.\n";

export const saveFile =  (fileName: string, fileContent: string, input="") => {

    const files = JSON.parse(localStorage.getItem('files')) || [];
    const fileNameList = JSON.parse(localStorage.getItem('fileNameList')) || [];
    const newFile = { fileName, fileContent, input };

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

const generateFileName = (fileNameList, prefix="untitled")=>{
    let i =  1;
    while (true){
        if(!fileNameList.includes(`${prefix}${i}.py`))
            return `${prefix}${i}.py`;
        i++;
    }
}

export const createNewFile =  () => {
    const fileList = JSON.parse(localStorage.getItem('fileNameList')) || [];
    const fileName = generateFileName(fileList);
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

export const renameFile = async (fileName: string, newFileName: string) => {

    if(newFileName===null || newFileName==="" || newFileName===fileName){
        return;
    }
    newFileName = newFileName.replace(/[^a-zA-Z0-9-_.]/g, '').replace('\n', '')

    const files = JSON.parse(localStorage.getItem('files')) || [];
    const fileNameList = JSON.parse(localStorage.getItem('fileNameList')) || [];

    if(newFileName.length < 3 || newFileName.slice(-3) !==".py"){
        newFileName = newFileName + '.py';
    }
    if(fileNameList.includes(newFileName)){

        newFileName = generateFileName(fileNameList, newFileName.slice(0,-3));
    }


    // rename in file name List
    let fileIndex = fileNameList.findIndex(file => file === fileName);
    if (fileIndex !== -1) {
        fileNameList[fileIndex] = newFileName; // Replace the file content if exists
    }
    fileIndex = files.findIndex(file => file.fileName === fileName);
    if (fileIndex !== -1) {
        files[fileIndex].fileName = newFileName; // Replace the file content if exists
    }
    localStorage.setItem('files', JSON.stringify(files));
    localStorage.setItem('fileNameList', JSON.stringify(fileNameList));

}


export const deleteFile = async (fileName: string) => {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    const fileNameList = JSON.parse(localStorage.getItem('fileNameList')) || [];

    // rename in file name List
    let fileIndex = fileNameList.findIndex(file => file === fileName);
    if (fileIndex !== -1) {
        fileNameList.splice(fileIndex, 1) // Replace the file content if exists
    }
    fileIndex = files.findIndex(file => file.fileName === fileName);
    if (fileIndex !== -1) {
        files.splice(fileIndex, 1) // Replace the file content if exists
    }
    localStorage.setItem('files', JSON.stringify(files));
    localStorage.setItem('fileNameList', JSON.stringify(fileNameList));

}

