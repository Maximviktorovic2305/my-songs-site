import { Skeleton } from "../ui/skeleton"

const SkeletonCommentItem = () => {
  return (
	 <section className="mt-4 flex mb-2 items-center gap-2">
		<Skeleton className="size-18 min-w-18" />
		<Skeleton className="w-full h-18" />
	 </section>
  )
}

export default SkeletonCommentItem
