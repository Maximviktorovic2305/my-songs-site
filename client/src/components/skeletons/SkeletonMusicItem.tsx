import { Skeleton } from "../ui/skeleton"

const SkeletonMusicItem = () => {
  return (
	 <section className="flex mb-2 items-center gap-2">
		<Skeleton className="size-12 min-w-12" />
		<Skeleton className="w-full h-12" />
	 </section>
  )
}

export default SkeletonMusicItem
