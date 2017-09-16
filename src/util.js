import FILE_TYPES from 'common/file-types';

export const resetNode = (node) => {
  const { children } = node;
  if (!children) {
    return {
      ...node,
      invisible: false,
    }    
  }
  const resetedChildren = children.map((child) => {
    return resetNode(child);
  });

  return {
    ...node,
    children: resetedChildren,
    invisible: false,
  };
}

export const filterNodeBySearch = (node, searchContent) => {
  const { name, children } = node;
  if (name.indexOf(searchContent) > -1) {
    return {
      ...node,
      invisible: false,
    };
  }

  if (children && children.length) {
    const filteredChildren = children.map((child) => {
      return filterNodeBySearch(child, searchContent);
    });

    if (filteredChildren.some((child) => {
      const { invisible } = child;
      return invisible == false; 
    })) {
      return {
        ...node,
        invisible: false,      
        children: filteredChildren,
      };
    } else {
      return {
        ...node,
        invisible: true,      
        children: filteredChildren,
      };      
    }
  }

  return {
    ...node,
    invisible: true,    
  };  
}

export const filterNodeOfChecked = (node, checkedKeys, parentKeys = []) => {
  const { name, type = FILE_TYPES.FILE, children } = node;
  const currentKeys = parentKeys.length ? [...parentKeys, `${name}:${type}`] : [`${name}:${type}`];
  const currentKeyStr = currentKeys.join('-');

  const resultNode = {
    ...node,
    invisible: currentKeys.length === 1
                ? false
                : checkedKeys.indexOf(currentKeyStr) < 0,
  };
  
  if (children && children.length) {
    const checkedChildren = children.map((child) => {
      return filterNodeOfChecked(child, checkedKeys, currentKeys);
    });

    return {
      ...resultNode,
      children: checkedChildren,
    }
  }

  return resultNode;
}