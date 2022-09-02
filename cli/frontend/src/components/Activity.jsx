import classNames from 'classnames';
import {useContext, useMemo, useState} from 'react';
import {DataContext} from '../context';
import Title from './Title';

const Activity = () => {
  const [selected, setSelected] = useState(null);
  const {history, selectedModule} = useContext(DataContext);
  const moduleHistory = useMemo(
    () => (history || []).filter((e) => e?.module === selectedModule),
    [history, selectedModule],
  );

  return (
    <>
      <Title module={selectedModule} text="activity" />
      <p>
        {moduleHistory.length} event{moduleHistory.length > 1 && 's'} recorded:
      </p>
      <div className="flex flex-col gap-3 mt-3">
        {moduleHistory.map(({uid, module, family, method, args, stack}) => {
          return (
            <div key={uid} className="bg-zinc-600 rounded p-5 shadow text-xs w-full">
              <div className="flex items-center w-full">
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex">
                    <pre className="inline">{module}</pre>
                    <span className="ml-1">called</span>
                  </div>
                  <code
                    lang="javascript"
                    className="bg-zinc-700 rounded p-2 mt-2 overflow-auto block select-all max-h-40"
                  >
                    {family}.{method}(
                    {(args || []).map((a) => JSON.stringify(a, null, 2)).join(', ')})
                  </code>
                </div>
                <div
                  className="ml-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setSelected((prev) => (prev === uid ? null : uid))}
                >
                  <i className="bi bi-chevron-down p-3" />
                </div>
              </div>
              {selected === uid && (
                <div className="mt-3 flex flex-col gap-3">
                  {stack.map(
                    ({file, fileLine, fileColumn, mapping, mappingLine, mappingColumn, module}) => (
                      <div
                        className={classNames('flex flex-col py-1 border-b border-zinc-500', {
                          'opacity-60': !module,
                        })}
                      >
                        {module && <div className="font-bold text-zinc-300">{module}</div>}
                        {mapping && (
                          <div>
                            {mapping}:{mappingLine}:{mappingColumn}
                          </div>
                        )}
                        <div className="text-zinc-400">
                          {file}:{fileLine}:{fileColumn}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Activity;
