import { Subcategory } from 'components/Subcategory';
import { Page } from 'layout/Page';
import { CategoryFragment } from 'src/graphql/categories.generated';

interface CategoryProps {
  category: CategoryFragment;
}

export const Category = ({ category }: CategoryProps) => {
  const { name, start, end, subcategories } = category;

  const startDate = start;

  return (
    <Page>
      <h2>{name}</h2>
      <p>
        start: <time dateTime={start}>{startDate}</time>
      </p>

      {subcategories?.map((subcategory) => (
        <Subcategory subcategory={subcategory} />
      ))}
    </Page>
  );
};

export default Category;
