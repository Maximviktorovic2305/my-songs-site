import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils' // Убедитесь, что у вас есть этот файл утилит

const titleVariants = cva('font-bold', {
	variants: {
		size: {
			h1: 'text-2xl',
			h2: 'text-xl',
			h3: 'text-lg',
			h4: 'text-base',
			h5: 'text-sm',
			h6: 'text-xs',
			default: 'text-base',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'

interface TitleProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof titleVariants> {
	asChild?: boolean
	as?: HeadingTag
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
	({ className, size, asChild = false, as, ...props }, ref) => {
		const Comp = asChild ? Slot : as || 'span'

		const computedSize =
			as && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as)
				? (as as VariantProps<typeof titleVariants>['size'])
				: size

		return (
			<Comp
				data-slot='title'
				className={cn(titleVariants({ size: computedSize, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)

Title.displayName = 'Title'

export { Title, titleVariants }
