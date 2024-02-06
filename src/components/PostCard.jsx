import React from 'react'
import appwriteServices from '../appwrite/conf'
import {Link} from 'react-router-dom'

const PostCard = ({$id , title , }) => {
  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray rounded-xl p-4' >
        {/* <div className='w-full justify-center mb-4'>

        </div> */}
        <h2>{title}</h2>
    </div>
   </Link>
  )
}

export default PostCard