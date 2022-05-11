import { Link } from 'react-router-dom'

const CharacterCreationPage = () => {
  return (
    <>
      <p>
        create your character
      </p>
      <Link to='/select-map'>
        Select map
      </Link>
    </>
  )
}

export default CharacterCreationPage
