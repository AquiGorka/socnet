import yo from 'yo-yo'

const Nav = () => yo`<ul>
  <li><a href="#/">Home</a></li>
  <li><a href="#/section">Section</a></li>
  <li>
    <ul>
      <li><a href="#/inner/slug-1">Slug 1</a></li>
      <li><a href="#/inner/slug-2">Slug 2</a></li>
    </ul>
  </li>
</ul>`

export default Nav
