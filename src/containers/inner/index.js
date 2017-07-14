import yo from 'yo-yo'

const Inner = ({ params }) => yo`<div>Inner ${JSON.stringify(params)}</div>`

export default Inner
