import React, { useState } from 'react';
import { IRepo } from '../models/models';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

export const RepoCard = ({ repo }: { repo: IRepo }) => {
	const { addFavourite, removeFavourite } = useActions();
	const { favourites } = useAppSelector((state) => state.github);

	const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

	const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		addFavourite(repo.html_url);
		setIsFav(true);
	};

	const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		removeFavourite(repo.html_url);
		setIsFav(false);
	};

	return (
		<div className='border-2 border-blue-200 py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-blue-50 hover:cursor-pointer transition-all'>
			<a href={repo.html_url} target='_blank' rel='noreferrer'>
				<h2 className='text-lg font-bold'>{repo.full_name}</h2>
				<p className='text-sm'>
					Forks:{' '}
					<span className='font-bold mr-2 text-blue-400'>{repo.forks}</span>
					Watchers:{' '}
					<span className='font-bold mr-2 text-blue-400'>{repo.watchers}</span>
				</p>
				<p className='text-sm font-semibold text-blue-400'>
					{repo?.description}
				</p>

				<div className='flex justify-end items-center'>
					{!isFav && (
						<button
							className='py-2 px-4 mr-2 bg-yellow-400 text-white rounded hover:shadow-md transition-all w-[95px]'
							onClick={addToFavourites}
						>
							Add
						</button>
					)}

					{isFav && (
						<button
							className='py-2 px-4 mr-2 bg-red-400 text-white rounded hover:shadow-md transition-all w-[95px]'
							onClick={removeFromFavourite}
						>
							Remove
						</button>
					)}
				</div>
			</a>
		</div>
	);
};
