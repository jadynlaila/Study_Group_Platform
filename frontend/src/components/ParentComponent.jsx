import React, { useState } from 'react';
import GroupCreationModule from './groupCreationModule';
import GroupSearchModule from './groupSearchModule';

const ParentComponent = () => {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  return (
    <div>
      {isCreatingGroup ? (
        <GroupCreationModule onCancel={() => setIsCreatingGroup(false)} />
      ) : (
        <GroupSearchModule onCreateGroup={() => setIsCreatingGroup(true)} />
      )}
    </div>
  );
};

export default ParentComponent;
