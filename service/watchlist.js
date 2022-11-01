function formatNewList(watchlist, watch) {
  const itemIndex = watchlist.indexOf(watch);

  itemIndex === -1 ? watchlist.push(watch) : watchlist.splice(itemIndex, 1);

  return watchlist;
}

module.exports = { formatNewList };
