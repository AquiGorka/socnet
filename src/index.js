const yo = require('yo-yo')

// state
const state = {
    version: '0.0.1',
    count: 0,
}

// components
const Version = ({ version }) => yo`<div>${version}</div>`
const component = ({ state, update }) => {
    const onclick = () => {
        state.count ++
        update()
    }
    const { count } = state
    return yo`<div onclick=${onclick}>section ${count}</div>`
}
const nav = () => yo`<ul>
        <li>
            1
        </li>
        <li>
            2
        </li>
    </ul>`

// app.js
const App = ({ state, update }) => {
    const { version } = state
    return yo`<div>
        ${nav()}
        ${component({ state, update })}
        ${Version({ version })}
    </div>`
}


// index.js
const root = document.body.appendChild(document.createElement('div'))
const update = () => yo.update(root, App({ state, update }))
update()
