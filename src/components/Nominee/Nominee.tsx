import { Media } from 'components/Media';
import { NomineeFragment } from 'src/graphql/categories.generated';

interface NomineeProps {
  nominee: NomineeFragment;
}

// TODO: Style this component
export const Nominee = ({ nominee }: NomineeProps) => {
  const { name, media } = nominee;

  return (
    <section style={{ width: '500px' }}>
      <h4>{name}</h4>
      <Media media={media} />
    </section>
  );
};
export default Nominee;
