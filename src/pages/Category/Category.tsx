import { DateTime } from 'common';
import { Subcategory } from 'components';
import { globalUser } from 'signals';
import { convertServerDate } from 'utils';

import yuiPeace from 'assets/yui_peace.gif';
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
            {!fetching && !subcategories && (
                <>
                    <p>
                        Oh my, we've got an early bird! Sadly, this category
                        isn't ready for voting yet so you'll have to soak
                        yourself in a healthy dose of patience. Stay cute out
                        there!
                    </p>
                    <img src={yuiPeace} alt="Yui Hirasawa making peace signs" />
                </>
            )}
        </Page>
    );
};

export default Category;
