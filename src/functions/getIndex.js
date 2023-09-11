export function findSecondInstance(str, searchValue) {
    const firstIndex = str.indexOf(searchValue);
    if (firstIndex !== -1) {
      const secondIndex = str.indexOf(searchValue, firstIndex + 1);
      return secondIndex;
    }
    return -1; // Return -1 if the search value is not found in the string
  }