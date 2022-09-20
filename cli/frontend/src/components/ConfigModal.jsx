import {useEffect, useRef, useState} from 'react';

const ConfigModal = ({onHide, permissions}) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const modalContent = useRef(null);
  useEffect(() => {
    if (modalContent.current && window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(modalContent.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [modalContent]);

  return (
    <div
      onClick={() => onHide()}
      className="absolute left-0 top-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-zinc-800 rounded shadow-xl p-12 h-3/5 w-3/5 flex flex-col"
      >
        <div className="flex w-full">
          <div className="flex-grow">
            <div className="font-bold text-lg">Permissions JSON</div>
            <div className="text-sm">Based on captured app activity and user overrides.</div>
          </div>
          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(permissions, null, 2));
                setCopyButtonText('Copied!');
                setTimeout(() => setCopyButtonText('Copy'), 2000);
              }}
              className="bg-sandworm-yellow text-black font-bold p-4 rounded"
            >
              {copyButtonText}
            </button>
          </div>
        </div>
        <pre
          className="flex-grow overflow-scroll select-all mt-5 bg-zinc-900 p-5 shadow-inner selection:bg-sandworm-yellow selection:text-black"
          ref={modalContent}
        >
          {JSON.stringify(
            Object.keys(permissions).map((module) => ({module, permissions: permissions[module]})),
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
};

export default ConfigModal;
