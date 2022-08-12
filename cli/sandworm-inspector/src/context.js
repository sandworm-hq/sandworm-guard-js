import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useLocalStorage from './hooks/useLocalStorage';

export const DataContext = React.createContext();

export const DataProvider = ({children}) => {
  const [currentTab, setCurrentTab] = useLocalStorage('_sandworm_permissions', 'permissions');
  const [history, setHistory] = useState([]);
  const [selectedModule, setSelectedModule] = useLocalStorage('_sandworm_module', null);
  const [requiredPermissions, setRequiredPermissions] = useState({});
  const [explicitlyAddedPermissions, setExplicitlyAddedPermissions] = useState({});
  const [explicitlyRemovedPermissions, setExplicitlyRemovedPermissions] = useState({});

  useEffect(() => {
    const permissions = {};
    history.forEach((event) => {
      if (!permissions[event.module]) {
        permissions[event.module] = [];
      }
      const eventType = `${event.family}.${event.method}`;
      if (!permissions[event.module].includes(eventType)) {
        permissions[event.module].push(eventType);
      }
    });
    setRequiredPermissions(permissions);
  }, [history, setRequiredPermissions]);

  const permissions = useMemo(() => {
    return Object.keys(requiredPermissions).reduce(
      (acc, v) => ({
        ...acc,
        [v]: requiredPermissions[v]
          .concat(explicitlyAddedPermissions[v] || [])
          .filter((val) => !(explicitlyRemovedPermissions[v] || []).includes(val)),
      }),
      {},
    );
  }, [requiredPermissions, explicitlyAddedPermissions, explicitlyRemovedPermissions]);

  const updatePermissions = useCallback(
    (currentlyChecked, methodSlug) => {
      if (currentlyChecked) {
        setExplicitlyAddedPermissions((prev) => ({
          ...prev,
          [selectedModule]: (prev[selectedModule] || []).filter((v) => v !== methodSlug),
        }));
        if (requiredPermissions[selectedModule].includes(methodSlug)) {
          setExplicitlyRemovedPermissions((prev) => ({
            ...prev,
            [selectedModule]: [...(prev[selectedModule] || []), methodSlug],
          }));
        }
      } else {
        setExplicitlyRemovedPermissions((prev) => ({
          ...prev,
          [selectedModule]: (prev[selectedModule] || []).filter((v) => v !== methodSlug),
        }));
        if (!requiredPermissions[selectedModule].includes(methodSlug)) {
          setExplicitlyAddedPermissions((prev) => ({
            ...prev,
            [selectedModule]: [...(prev[selectedModule] || []), methodSlug],
          }));
        }
      }
    },
    [
      requiredPermissions,
      selectedModule,
      setExplicitlyAddedPermissions,
      setExplicitlyRemovedPermissions,
    ],
  );

  return (
    <DataContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        history,
        setHistory,
        selectedModule,
        setSelectedModule,
        requiredPermissions,
        setRequiredPermissions,
        explicitlyAddedPermissions,
        setExplicitlyAddedPermissions,
        explicitlyRemovedPermissions,
        setExplicitlyRemovedPermissions,
        permissions,
        updatePermissions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
