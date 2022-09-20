import classNames from 'classnames';
import {useState, useContext} from 'react';
import {DataContext} from '../context';
import useESCPress from '../hooks/useESCPress';
import ConfigModal from './ConfigModal';

const PERMISSION_PREVIEW_LIMIT = 3;

const Modules = ({history, currentTab}) => {
  const {requiredPermissions, selectedModule, setSelectedModule, permissions} =
    useContext(DataContext);
  const [configModalVisible, setConfigModalVisible] = useState(false);
  useESCPress(() => setConfigModalVisible(false));

  return (
    <>
      <div className="flex-grow overflow-scroll shadow-inner">
        {Object.keys(requiredPermissions).length === 0 && (
          <div className="text-neutral-400">Listening to events from your app...</div>
        )}
        {Object.keys(requiredPermissions)
          .sort()
          .map((module) => {
            const modules = module.split('>');
            return (
              <div
                key={module}
                className={classNames(
                  'w-full py-3 px-5 bg-zinc-700 rounded shadow flex items-center mb-4 cursor-pointer border-2',
                  {
                    'border-sandworm-yellow': selectedModule === module,
                    'border-zinc-900': selectedModule !== module,
                  },
                )}
                onClick={() => setSelectedModule(module)}
              >
                <div className="flex flex-col flex-grow gap-2">
                  <div className="font-bold">{modules[0]}</div>
                  {modules.length > 1 && (
                    <div className="text-zinc-400 text-xs">
                      via{' '}
                      {modules
                        .slice(1)
                        .map((p) => <code key={p}>{p}</code>)
                        .reduce((prev, curr) => [prev, ' > ', curr])}
                    </div>
                  )}
                  <div className="text-xs">
                    Using{' '}
                    {requiredPermissions[module]
                      .slice(0, PERMISSION_PREVIEW_LIMIT)
                      .map((p) => <code key={p}>{p}</code>)
                      .reduce((prev, curr) => [prev, ', ', curr])}
                    {requiredPermissions[module].length > PERMISSION_PREVIEW_LIMIT &&
                      `, and ${requiredPermissions[module].length - PERMISSION_PREVIEW_LIMIT} more`}
                  </div>
                </div>
                <div className="ml-3">
                  <i className="bi bi-chevron-right" />
                </div>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => setConfigModalVisible(true)}
        className="mt-8 bg-sandworm-yellow text-black font-bold p-4 rounded"
      >
        Get Permissions JSON
      </button>
      {configModalVisible && (
        <ConfigModal onHide={() => setConfigModalVisible(false)} permissions={permissions} />
      )}
    </>
  );
};

export default Modules;
