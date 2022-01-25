import axios from 'axios';
import { UniqueDirectivesPerLocationRule } from 'graphql';
import { useEffect } from 'react';
import { useState } from 'react';
import { Judge as JudgeType } from 'src/generated/graphql';
import classes from './judge.module.css';

import { useQuery } from 'urql';

interface JudgeProps {
	judgeData: JudgeType;
}

interface KitsuUser {
	data: {
		findProfileById: {
			avatarImage: {
				blurhash: string;
				views: {
					name: string;
					url: string;
				}[];
			};
			name: string;
		};
	};
}

const useGetUser = (userId: string): [KitsuUser | null, boolean, any] => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<KitsuUser | null>(null);
	const [error, setError] = useState<{}>();

	const query = `query($userId: ID!) {
	findProfileById(id: $userId) {
		name
		avatarImage {
			blurhash
			views(names: ["medium"]) {
				url
				name
			}
		}
	}
}`;

	useEffect(() => {
		axios
			.post('https://kitsu.io/api/graphql', {
				headers: {
					'Content-Type': 'application/json',
				},
				query: query,
				variables: {
					userId: userId,
				},
			})
			.then((req) => {
				setLoading(false);
				setData(req.data as KitsuUser);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.error);
			});
	}, []);

	return [data, loading, error];
};

export default function Judge({ judgeData }: JudgeProps) {
	const [data, loading, error] = useGetUser(judgeData.userId);

	if (error) {
		return <div>{error}</div>;
	}

	if (!loading && data) {
		console.log(data);

		const profile = data.data.findProfileById;

		return (
			<li className={classes.judge}>
				<img src={profile.avatarImage.views[0]?.url} />
				<p>{profile.name}</p>
			</li>
		);
	}

	return <div>data</div>;
}
