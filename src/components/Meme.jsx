import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'
import userService from '../services/user'

const Meme = ({ meme, handleLike, user }) => {
  const [memeLikes, setMemeLikes] = useState(meme.likes)
  const [userLikedMemes, setUserLikedMemes] = useState([])

  useEffect(() => {
    const fetchLikedMemes = async () => {
      const likedMemes = await userService.getUserLikedMemes()
      setUserLikedMemes(likedMemes)
    }
    fetchLikedMemes()
  }, [])

  const likeMeme = (dislike) => {
    if (userLikedMemes.includes(meme.id)) {
      return
    }
    setUserLikedMemes(userLikedMemes.concat(meme.id))
    if (dislike) {
      setMemeLikes(memeLikes - 1)
    } else {
      setMemeLikes(memeLikes + 1)
    }
    handleLike(meme, dislike, memeLikes)
  }
  const LikeMeme = () => {
    return (
      <div className="like-buttons">
        <GoThumbsup className="like-button" onClick={() => likeMeme(false)} />
        <b>{memeLikes}</b>
        <GoThumbsdown
          className="dislike-button"
          onClick={() => likeMeme(true)}
        />
      </div>
    )
  }

  const downloadImage = (event) => {
    event.preventDefault()
    const imageUrl = event.target.src
    const link = document.createElement('a')
    link.href = imageUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.download = 'my-image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="meme-post">
      <LazyLoadImage src={meme.url} alt={meme.url} onClick={downloadImage} />
      <LikeMeme />
    </div>
  )
}

export default Meme
