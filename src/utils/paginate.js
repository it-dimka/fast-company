export function paginate(items, pageNumber, pageSize) {
  if (items.length <= pageSize) return items;

  const startIndex = (pageNumber - 1) * pageSize;
  const itemsToPage = [...items].splice(startIndex, pageSize);
  return itemsToPage.length !== 0
    ? itemsToPage
    : [...items].splice(startIndex - pageSize, pageSize);
}
