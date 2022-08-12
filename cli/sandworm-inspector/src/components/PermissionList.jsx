import { useContext } from 'react';
import { DataContext } from '../context';
import { nodeLibrary, webLibrary } from '../libraries';
import Permission from './Permission';

function PermissionList({filters, selectedLibrary}) {
  const {permissions, selectedModule, updatePermissions} = useContext(DataContext);

  return (
    <div className="flex flex-col gap-8">
      {(selectedLibrary === 'web' ? webLibrary : nodeLibrary)
        .filter(
          (family) =>
            !filters || filters.map((filter) => filter.split('.')[0]).includes(family.name),
        )
        .map((family) => {
          return (
            <div key={family.name}>
              <div className="mb-2 flex items-center">
                <code className="font-bold">{family.name}</code>
                <i className="gg-external block ml-4 w-2 h-2 text-zinc-400" />
              </div>
              <div className="flex flex-col gap-1">
                {family.methods
                  .filter(
                    (method) =>
                      !filters ||
                      filters
                        .map(
                          (filter) => filter.split('.')[0] === family.name && filter.split('.')[1],
                        )
                        .includes(method.name),
                  )
                  .map((method) => {
                    const methodSlug = `${family.name}.${method.name}`;
                    const currentlyChecked = permissions[selectedModule]?.includes?.(methodSlug);
                    return (
                      <Permission
                        key={methodSlug}
                        method={method}
                        checked={currentlyChecked}
                        onClick={() => updatePermissions(currentlyChecked, methodSlug)}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PermissionList;
