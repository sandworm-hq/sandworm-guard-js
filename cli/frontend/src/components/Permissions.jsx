import classNames from 'classnames';
import {useEffect, useState, useContext} from 'react';
import PermissionList from './PermissionList';
import {nodeLibrary, webLibrary} from '../libraries';
import {DataContext} from '../context';
import Title from './Title';

const Permissions = () => {
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const {
    requiredPermissions,
    selectedModule,
    explicitlyRemovedPermissions,
  } = useContext(DataContext);

  useEffect(() => {
    if (!selectedLibrary && Object.values(requiredPermissions).length) {
      const sampleMethod = Object.values(requiredPermissions)[0][0];
      const sampleFamily = sampleMethod.split('.')[0];
      if (webLibrary.find((v) => v.name === sampleFamily)) {
        setSelectedLibrary('web');
      } else if (nodeLibrary.find((v) => v.name === sampleFamily)) {
        setSelectedLibrary('node');
      }
    }
  }, [requiredPermissions, selectedLibrary]);

  return (
    <>
      <Title module={selectedModule} text="permissions" />
      <ul className="flex gap-4 text-neutral-400">
        <li
          className={classNames('cursor-pointer', {
            'font-bold text-neutral-200 border-b-2': selectedLibrary === 'web',
          })}
          onClick={() => setSelectedLibrary('web')}
        >
          Web
        </li>
        <li
          className={classNames('cursor-pointer', {
            'font-bold text-neutral-200 border-b-2': selectedLibrary === 'node',
          })}
          onClick={() => setSelectedLibrary('node')}
        >
          Node
        </li>
      </ul>
      <div className="w-full py-3 px-5 bg-zinc-700 rounded shadow items-center mt-4 mb-10">
        <div className="mb-2">Required permissions:</div>
        <PermissionList
          filters={requiredPermissions[selectedModule]}
          selectedLibrary={selectedLibrary}
        />
      </div>
      {explicitlyRemovedPermissions[selectedModule]?.length > 0 && (
        <div className="mb-10 flex gap-3 bg-yellow-900 rounded shadow p-7 items-center">
          <i className="bi bi-exclamation-triangle-fill text-yellow-500 block text-lg" />
          <div className="text-sm">
            Some required permissions have been explicitly removed.
            <br />
            This may cause your app to not function as expected.
          </div>
        </div>
      )}
      <PermissionList selectedLibrary={selectedLibrary} />
    </>
  );
};

export default Permissions;
