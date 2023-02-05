export type Comment = {
  id: number
  username: string
  content: string
}

export type DeadPerson = {
  id: number
  fullname: string
  photo: string
  age: number
  birthday: string
  birthplace: string
  deadDay: string
  deadPlace: string
  reason: string
  netWorth: string
  candles: number
  career?: string
  death?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  urlname?: string
}

export type News = {
  id: number
  title: string
  photo: string
  description: string
  published_at?: string
  hashtags?: string
  username: string
  Comment: Comment[]
}

export type Comment = {
  id: number
  content: string
  username: string
}
