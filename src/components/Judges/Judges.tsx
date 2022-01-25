import { Judge } from './Judge';
import { useFetchJudgesQuery } from './Judges.generated';

interface JudgesProps {}

export default function Judges({}: JudgesProps) {
	const [{ data, fetching, error }] = useFetchJudgesQuery();

	if (data && !fetching && !error) {
		return (
			<section>
				<h2>Judges</h2>
				<ul>
					{data.year[0].judges.map((judge) => {
						return <Judge judgeData={judge} key={judge.id} />;
					})}
				</ul>
			</section>
		);
	}

	return <div>loading</div>;
}
