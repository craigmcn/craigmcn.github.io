const q = location.search.substring(3).replace(/[^A-Za-z0-9 \.,_-]/gim, ''),
  l = q.toLowerCase().split(' '),
  resultsEl = document.getElementById('results'),
  resultsList = [],
  toSearchArray = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .split(' ')

if (l.length === 0) {
  resultsEl.innerHTML = 'No search parameters detected.'
} else {
  fetch('/feed.json')
    .then(response => response.json())
    .then(data => {
      const results = data.filter(
        val =>
          l.some(w => toSearchArray(val.title).includes(w)) || // in title
          l.some(w => toSearchArray(val.excerpt).includes(w)) || // in excerpt
          l.filter(w => val.categories.map(c => c.toLowerCase()).includes(w))
            .length || // in categories
          l.filter(w => val.tags.map(t => t.toLowerCase()).includes(w)).length
      ) // in tags

      if (results.length > 0) {
        results.forEach(r => {
          resultsList.push(
            '<div><h3><a href="' +
              r.url +
              '">' +
              r.title +
              '</a> <span class="subtitle">' +
              r.date +
              '</span></h3><p>' +
              r.excerpt +
              '</p></div>'
          )
        })
        resultsEl.innerHTML = resultsList.join('\n')
      } else {
        resultsEl.innerHTML =
          'Your search for <em>' + q + '</em> returned no results.'
      }
    })
    .catch(error => console.error(error))
}
