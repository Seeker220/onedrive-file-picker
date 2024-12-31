import React, { useState } from 'react';

const FilePicker = () => {
  // State to store the selected file path
  const [filePath, setFilePath] = useState('');

  const launchPicker = () => {
    if (!window.OneDrive) {
      console.error("OneDrive SDK not loaded.");
      alert("OneDrive Picker is not available. Please check your internet connection or SDK script.");
      return;
    }

    const odOptions = {
      clientId: 'b15665d9-eda6-4092-8539-0eec376afd59',
      action: 'share',
      multiSelect: false,
      viewType: 'all', // Allows selecting both files and folders
      success: (files) => {
        const selectedFile = files.value[0];
        const fullPath = selectedFile.parentReference.path + '/' + selectedFile.name;

        console.log('Files selected:', files);

        // Extract the file path after 'root:/'
        const pathAfterRoot = fullPath.split('root:/')[1];  // Get the part after 'root:/'

        // Set the file path in the state to display below the button
        setFilePath(pathAfterRoot);
      },
      cancel: () => console.log('Picker closed without selecting a file.'),
      error: (error) => console.error('Error:', error),
    };

    window.OneDrive.open(odOptions);
  };

  return (
      <div>
        <h1>Select a File</h1>
        <button onClick={launchPicker}>Launch Picker</button>

        {/* Display the selected file path below the button */}
        {filePath && (
            <div>
              <h3>Selected File Path:</h3>
              <p>{filePath}</p>
            </div>
        )}
      </div>
  );
};


export default FilePicker;