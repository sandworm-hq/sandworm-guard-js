import classNames from 'classnames';
import React, {useContext, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Activity from './components/Activity';
import Modules from './components/Modules';
import Permissions from './components/Permissions';
import {DataContext, DataProvider} from './context';

import './index.css';

function App() {
  const {history, setHistory, currentTab, setCurrentTab, selectedModule} = useContext(DataContext);

  useEffect(() => {
    const evtSource = new EventSource('/events');
    evtSource.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log('Received data:', data);
      setHistory((history) => [...history, ...data]);
    };
    return () => {
      evtSource.close();
    };
  }, [setHistory]);

  return (
    <div className="w-full h-full max-h-full flex flex-col text-neutral-200 relative">
      <div className="px-10 py-3 bg-[#434245] flex items-center">
        <div className="flex-grow flex gap-6 items-center">
          <img width={177} src="/logo.png" alt="Sandworm" />
          <div className="bg-custom-light-gray py-2 px-3 text-sandworm-yellow-light uppercase text-xs rounded font-bold">
            Inspector
          </div>
        </div>
        <div>
          <ul className="flex gap-10 text-neutral-300 text-xl">
            <li
              className={classNames('cursor-pointer', {
                'font-bold text-neutral-200 border-b-2': currentTab === 'permissions',
              })}
              onClick={() => setCurrentTab('permissions')}
            >
              Permissions
            </li>
            <li
              className={classNames('cursor-pointer', {
                'font-bold text-neutral-200 border-b-2': currentTab === 'activity',
              })}
              onClick={() => setCurrentTab('activity')}
            >
              Activity
            </li>
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-grow flex-shrink min-h-0">
        <div className="w-1/2 bg-zinc-900 p-10 h-full flex flex-col">
          <Modules history={history} currentTab={currentTab} />
        </div>
        <div className="w-1/2 bg-zinc-800 p-10 h-full">
          <div className="h-full overflow-scroll">
            {currentTab === 'permissions' && selectedModule && <Permissions />}
            {currentTab === 'activity' && selectedModule && <Activity />}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
);
