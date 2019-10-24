import React, { useState } from 'react'
import TagCloud from 'react-tag-cloud'

import '../styles/App.css'

function App() {
  // const [user, setUser] = useState()
  const [data, setData] = useState()

  function getComments() {
    fetch(
      'https://www.reddit.com/user/AN_HONEST_COMMENT/comments/.json?limit=5'
    )
      .then(res => res.json())
      .then(res => {
        const tempComments = res.data.children.map(info => info.data.body)
        const comments = [...tempComments]

        const temp = comments.map(comment =>
          comment.split(/[ ,."()?\t!“”*~&;\n/]/)
        )
        const tempMerge = [].concat.apply([], temp)

        var wordArray = {}

        for (var i = 0; i < tempMerge.length; i++) {
          var word = tempMerge[i]
          if (!wordArray[word]) {
            wordArray[word] = 1
          } else {
            wordArray[word]++
          }
        }

        Object.keys(wordArray).map((i, j) =>
          console.log(i + ' - ' + wordArray[i])
        )
        console.log(wordArray)
        setData(wordArray)
      })
  }

  function randomColor() {
    return (
      '#' +
      Math.random()
        .toString(16)
        .substr(-6)
    )
  }

  return (
    <div className="App">
      <h1>Reddit Comments WordCloud</h1>
      <p>Get your last 100 comments in the form of a word cloud.</p>
      {/* {data && Object.keys(data).map(i => console.log(data[i]))} */}
      <button onClick={getComments}>git it</button>

      <TagCloud className="cloud">
        {data &&
          Object.keys(data).map((i, j) => (
            <div
              key={j}
              style={{
                color: randomColor(),
                fontSize: 24 * data[i],
              }}
            >
              {i}
            </div>
          ))}
      </TagCloud>
    </div>
  )
}

export default App
