export const filterNode = (node, searchContent) => {
  const { name, children } = node;
  if (name.indexOf(searchContent) > -1) {
    return {
      ...node,
      invisible: false,
    };
  }

  if (children && children.length) {
    const filteredChildren = children.map((child) => {
      return filterNode(child);
    });
    if (filteredChildren.length) {
      return {
        ...node,
        invisible: false,      
        children: filteredChildren,
      };
    }
  }

  return {
    ...node,
    invisible: true,    
  };  
}