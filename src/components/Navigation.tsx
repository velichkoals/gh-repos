import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
	return (
		<nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-blue-400 text-white'>
			<h3 className='font-bold text-lg'>GitHub Search</h3>
			<span>
				<Link to='/' className='mr-10 font-semibold'>
					Home
				</Link>
				<Link to='/favourites' className='mr-5 font-semibold'>
					Favourites
				</Link>
			</span>
		</nav>
	);
};
