import yo from 'yo-yo'

// state store
const state = {
    version: '0.0.1',
    count: 1,
}

// components
const Version = ({ version }) => yo`<div>Version: ${version}</div>`
const Component = ({ state, update }) => {
    const onclick = () => {
        state.count ++
        update()
    }
    const { count } = state
    return yo`<div onclick=${onclick}>Count (click on me to increment): ${count}</div>`
}
const nav = () => yo`<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>`

// app.js
const App = ({ state, update }) => {
    const { version } = state
    return yo`<div>
        ${nav()}
        ${Component({ state, update })}
        ${Version({ version })}
    </div>`
}


// index.js
const root = document.body.appendChild(document.createElement('div'))
const update = () => yo.update(root, App({ state, update }))
update()
