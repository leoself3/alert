import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { useRouter } from 'next/router'

interface Props {
  title: string
  hashtags: string
}

const ShareButtons: React.FC<Props> = ({ title, hashtags }) => {
  const router = useRouter()
  let sharedURL: string = ''
  if (typeof window !== 'undefined')
    sharedURL = 'https://alert.rip' + router.asPath

  return (
    <div className='flex my-3 gap-3'>
      <FacebookShareButton
        url={sharedURL}
        quote='This is facebook share'
        hashtag={hashtags && hashtags[0]}
      >
        <FacebookIcon className='text-lg rounded-full h-10 w-10' />
      </FacebookShareButton>
      <TwitterShareButton
        title={title}
        url={sharedURL}
        hashtags={typeof hashtags === 'string' ? hashtags.split(',') : hashtags}
      >
        <TwitterIcon className='text-lg rounded-full h-10 w-10' />
      </TwitterShareButton>
    </div>
  )
}

export default ShareButtons
