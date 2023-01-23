import {
  ChonkyActions,
  FileBrowser,
  FileList,
  FileNavbar,
  FileToolbar,
  setChonkyDefaults,
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { listFeedFiles, getFeedContent } from '../features/api/api'
import fileDownload from 'js-file-download'

// DevNote this code comes from the Chonky example page

setChonkyDefaults({ iconComponent: ChonkyIconFA })

export default function FeedBrowser(props) {
  const [, setError] = useState(null);
  const [folderPrefix, setKeyPrefix] = useState('/');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    listFeedFiles(folderPrefix)
      .then(setFiles)
      .catch((error) => setError(error.message))
  }, [folderPrefix, setFiles]);

  const folderChain = useMemo(() => {
    let folderChain
    if (folderPrefix === '/') {
      folderChain = [];
    } else {
      let currentPrefix = '';
      folderChain = folderPrefix
        .replace(/\/*$/, '')
        .split('/')
        .map(
          (prefixPart) => {
            currentPrefix = currentPrefix
              ? [currentPrefix, prefixPart].join('/')
              : prefixPart;
            return {
              id: currentPrefix,
              name: prefixPart,
              isDir: true,
            };
          }
        );
    }
    folderChain.unshift({
      id: '/',
      name: 'EPICAST-DEMO-FEED',
      isDir: true,
    });
    return folderChain;
  }, [folderPrefix]);

  const handleFileAction = useCallback(
    async (action) => {
      if (action.id === ChonkyActions.OpenFiles.id) {
        console.log('open file', action)
        if (action.payload.files && action.payload.files.length !== 1) return;
        if (!action.payload.targetFile) return;
        if (action.payload.targetFile.isDir) {
          const newPrefix = `${action.payload.targetFile.id.replace(/\/*$/, '')}/`;
          console.log(`Key prefix: ${newPrefix}`);
          setKeyPrefix(newPrefix);
        } else {
          const selectedKey = action.payload.targetFile.id
          const selectedFile = action.payload.targetFile.name
          console.log('Download', selectedKey)
          getFeedContent(selectedKey).then((content) => fileDownload(content, selectedFile))
        }
      }
      if (action.id === ChonkyActions.DownloadFiles.id) {
        const selectedFiles = action.state.selectedFilesForAction
        if (selectedFiles === undefined || selectedFiles.length !== 1) return
        const selectedKey = selectedFiles[0].id
        const selectedFile = selectedFiles[0].name
        console.log('Download', selectedKey)
        getFeedContent(selectedKey).then((content) => fileDownload(content, selectedFile))
      }
    },
    [setKeyPrefix]
  );

  const fileActions = useMemo(
    () => [
      ChonkyActions.DownloadFiles, // Adds a button and a shortcut: Delete
    ],
    []
  );

  return (
    <div className="story-wrapper">
      <div style={{ height: 400 }}>
        <FileBrowser
          instanceId='FeedBrowser'
          files={files}
          folderChain={folderChain}
          onFileAction={handleFileAction}
          defaultFileViewActionId={ChonkyActions.EnableListView.id}
          fileActions={fileActions}
        >
          <FileNavbar />
          <FileToolbar />
          <FileList />
        </FileBrowser>
      </div>
    </div>
  );
};
