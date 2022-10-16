export const toDateTransform = (item) => {
  let datetime = new Date(item * 1000)
  let date = datetime.toLocaleDateString();
  let time = datetime.toLocaleTimeString();
  if (item === '') {
    return '';
  }
  return `${date} ${time}`;
};

export const toUnixTransform = (item) => {
  return new Date(item).getTime() / 1000
}
