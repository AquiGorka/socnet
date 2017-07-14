import yo from 'yo-yo'

const New = ({ onAdd }) => {
  const onclick = () => {
    onAdd({ r: Math.random(), t: Date.now() })
  }
  return yo`<div>
    <div onclick=${onclick}>Add</div>
  </div>`
}

export default New
