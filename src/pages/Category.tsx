import { DateTime } from 'components/DateTime';
import { Subcategory } from 'components/Subcategory';
import { Page } from 'layout/Page';
import { CategoryFragment } from 'src/graphql/categories.generated';

interface CategoryProps {
  category: CategoryFragment;
}

export const Category = ({ category }: CategoryProps) => {
  const { name, start, end, subcategories } = category;

  return (
    <Page>
      <h2>{name}</h2>
      <p>
        <DateTime dateTime={start} /> → <DateTime dateTime={end} />
      </p>

      {subcategories?.map((subcategory) => (
        <Subcategory subcategory={subcategory} />
      ))}
    </Page>
  );
};

export default Category;
