import React, { useEffect, useState } from 'react';
import {
	useLazyGetUserReposQuery,
	useSearchUsersQuery,
} from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { RepoCard } from '../components/RepoCard';

export const HomePage = () => {
	const [search, setSearch] = useState<string>('');
	const [dropdown, setDropDown] = useState<boolean>(false);
	const debounced = useDebounce(search);
	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
	});

	const [fetchRepos, { data: repos, isLoading: areReposLoading }] =
		useLazyGetUserReposQuery();

	useEffect(() => {
		setDropDown(debounced.length > 3 && data?.length! > 0);
	}, [debounced, data]);

	const clickHandler = (username: string) => {
		fetchRepos(username);
		setDropDown(false);
	};

	return (
		<div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
			{isError && (
				<p className='text-center text-red-500'>Something went wrong</p>
			)}

			<div className='relative w-[560px]'>
				<input
					type='text'
					className='border-2 rounded-sm py-2 px-4 w-full h-[35px] mb-2 text-[14px] focus:outline-none focus:border-blue-300'
					placeholder='Search for GitHub username...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{dropdown && (
					<ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
						{isLoading && <p className='text-center '>Loading...</p>}
						{data?.map((user) => (
							<li
								key={user.id}
								onClick={() => clickHandler(user.login)}
								className='py-2 px-4 hover:bg-gray-400 hover:text-white transition-colors cursor-pointer'
							>
								{user.login}
							</li>
						))}
					</ul>
				)}
				<div className='container'>
					{areReposLoading && (
						<p className='text-center'>Repositories are loading...</p>
					)}
					{repos?.map((repo) => (
						<RepoCard repo={repo} key={repo.id} />
					))}
				</div>
			</div>
		</div>
	);
};
