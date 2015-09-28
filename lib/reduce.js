
export default function (parameters, reducer, docs) {
  return docs
    .map(reducer)
    .map(function (value) {
      return {
        key: null,
        value
      };
    });
}
