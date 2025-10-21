export const formatModuleType = (type: string | undefined) => {
    return (type) && type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };