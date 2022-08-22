import React from 'react';
import { useAppSelector } from '../hooks/redux';

export const FavouritesPage = () => {
	const { favourites } = useAppSelector((state) => state.github);

	if (favourites.length === 0) return <p className='text-center'>No items.</p>;

	return (
		<div className='flex flex-col items-center pt-10 mx-auto h-screen w-screen'>
			<div className='font-bold text-blue-400 text-[32px] mb-3'>Favourites</div>
			<ul className='list-none'>
				{favourites.map((fav, index) => (
					<li key={fav} className='text-blue-600 hover:text-blue-400'>
						<span className='font-bold'>{index + 1}) </span>
						<a href={fav} target='_blank' rel='noreferrer'>
							{fav}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
