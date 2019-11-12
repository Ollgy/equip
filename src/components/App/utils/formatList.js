export default function(list) {
  return list.reduce((acc, item) => 
    acc.find(accItem => accItem.name === item.name)
      ? acc.map(accItem => accItem.name === item.name 
        ? { ...accItem, count: accItem.count + item.count } 
        : accItem)
      : [...acc, item]
    , [])
    .sort((a, b) => a.name > b.name ? 1 : -1)
}