import React from 'react'
import CardSkeleton from './skeleton'

export default function CardSkeletons({count}: {count: number}) {
	const skeletons = Array.from({length: count}, (_, index) => (
			<div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<CardSkeleton />
			</div>
		))
	
	return (
		<>
			{skeletons}
		</>
	)
}
