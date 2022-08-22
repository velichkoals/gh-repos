import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { useActions } from '../hooks/actions';

export const FavouritesPage = () => {
	const { favourites } = useAppSelector((state) => state.github);
	const { removeFavourite } = useActions();
	const removeFromFavourites = (repo: string) => {
		removeFavourite(repo);
	};

	if (favourites.length === 0)
		return (
			<p className='text-center mt-10 text-3xl text-blue-400'>
				Favorites is empty, add the first repository!
			</p>
		);

	return (
		<div className='flex flex-col items-center pt-10 mx-auto h-screen w-screen'>
			<div className='font-bold text-blue-400 text-[32px] mb-3'>Favourites</div>
			<ul className='list-none'>
				{favourites.map((fav, index) => (
					<li key={fav} className='text-blue-600 hover:text-blue-400 m-2'>
						<span className='font-bold'>{index + 1}) </span>
						<a href={fav} target='_blank' rel='noreferrer'>
							{fav}
						</a>
						<button
							className='py-1 px-2 ml-4 text-blue-400 rounded border border-blue-200
						 hover:shadow-md hover:text-blue-500 hover:border-blue-300  transition-all '
							onClick={() => removeFromFavourites(fav)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
