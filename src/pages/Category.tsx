import { DateTime } from 'components/DateTime';
import { Subcategory } from 'components/Subcategory';
import convertServerDate from 'helpers/convertServerDate';
import { Page } from 'layout/Page';
import { useContext } from 'react';
import { UserContext } from 'src/App';
import { CategoryFragment } from 'src/graphql/categories.generated';
import { useFetchVoteQuery } from 'src/graphql/fetchVotes.generated';

interface CategoryProps {
  category: CategoryFragment;
}

export const Category = ({ category }: CategoryProps) => {
  const { name, start, end, subcategories } = category;
  const [user] = useContext(UserContext);
  const [{ data, fetching, error }] = useFetchVoteQuery({
    variables: { token: user.token?.access_token },
  });

  const currentTime = new Date();

  return (
    <Page>
      <h2>{name}</h2>
      <p>
        <DateTime dateTime={start} /> → <DateTime dateTime={end} />
      </p>

      {!fetching &&
        convertServerDate(start).getMilliseconds() <
          currentTime.getMilliseconds() &&
        subcategories?.map((subcategory) => {
          const existingVote = subcategory.nominees.filter((nominee) => {
            return data?.fetchvote?.find(
              (vote) => vote.nominee.id === nominee.id,
            );
          });

          console.log(existingVote);

          return (
            <Subcategory
              subcategory={subcategory}
              existingVote={existingVote[0]?.id}
            />
          );
        })}
    </Page>
  );
};

export default Category;
