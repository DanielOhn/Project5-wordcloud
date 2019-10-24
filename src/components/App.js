import React, { useState } from 'react'
import TagCloud from 'react-tag-cloud'

import '../styles/App.css'

function App() {
  const [user, setUser] = useState()
  const [data, setData] = useState()

  const checkUser = () => {
    if (user) {
      getComments()
    }
  }

  function getComments() {
    setData()

    fetch('https://www.reddit.com/user/' + user + '/comments/.json?limit=25')
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

        setData(wordArray)
      }).catch(e => console.log(e.message))
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

      <input
        placeholder="Enter reddit username"
        onChange={event => setUser(event.target.value)}
      />
      <button onClick={checkUser}>get user</button>

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
