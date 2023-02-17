import Image from 'next/image'

type Props = {
  name: string
}

const Avatar = ({ name }: Props) => {
  return (
    <div className="flex items-center">
      <Image src={'/assets/blog/authors/jj.jpeg'} className="w-12 h-12 rounded-full mr-4" alt={name} width={60} height={60}/>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
