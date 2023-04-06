//creating an interface(for how should data about video need to be stored)
export interface Video {
  id: number,
  title: string,
  thumbnaiUrl: string,
  duration: number,
  uploadTime: string,
  views: number,
  author: string,
  videoUrl: string,
  description: string,
  subscriber: string,
  isLive: boolean
};
