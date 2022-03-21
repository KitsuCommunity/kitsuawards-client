import { Nominee } from 'components/Nominee';
import { SubcategoryFragment } from 'src/graphql/categories.generated';

interface SubcategoryProps {
  subcategory: SubcategoryFragment;
}

export const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const { name, nominees } = subcategory;

  return (
    <article>
      <h3>{name}</h3>
      {nominees?.map((nominee) => (
        <Nominee nominee={nominee} />
      ))}
    </article>
  );
};
export default Subcategory;
