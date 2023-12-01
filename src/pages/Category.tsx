import { DateTime } from 'common';
import { Subcategory } from 'components';
import { globalUser } from 'signals';
import { convertServerDate } from 'utils';

import { Page } from 'layout/Page';
import type { CategoryFragment } from 'src/graphql/categories.generated';
import { useFetchVoteQuery } from 'src/graphql/fetchVotes.generated';

interface CategoryProps {
    category: CategoryFragment;
}

export const Category = ({ category }: CategoryProps) => {
    const { name, start, end, subcategories } = category;
    const [{ data, fetching }] = useFetchVoteQuery({
        variables: { token: globalUser.value.token?.access_token },
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
                    const existingVote = subcategory.nominees.filter(
                        (nominee) => {
                            return data?.fetchVote?.find(
                                (vote) => vote.nominee.id === nominee.id,
                            );
                        },
                    );

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
